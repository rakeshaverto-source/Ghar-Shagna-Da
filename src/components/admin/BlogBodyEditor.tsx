'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import { Placeholder } from '@tiptap/extensions';
import { Image } from '@tiptap/extension-image';
import {
  Bold,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Pilcrow,
  Undo2,
  Redo2,
  ImagePlus,
  Loader2,
} from 'lucide-react';

interface BlogBodyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// The blog page renders one block per line, so give every non-list line its own
// paragraph; otherwise consecutive lines would merge into one paragraph in the editor.
function toBlockMarkdown(md: string) {
  const isList = (line: string) => /^([*-] |\d+\. )/.test(line);
  const out: string[] = [];
  for (const raw of md.replace(/\r/g, '').split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const prev = out[out.length - 1];
    if (prev !== undefined && !(isList(line) && isList(prev))) out.push('');
    out.push(line);
  }
  return out.join('\n');
}

// The serializer escapes HTML characters (e.g. "&" becomes "&amp;"), which headings would show literally
function decodeEntities(md: string) {
  return md
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

// Only the formatting the blog page can display: ##/###/#### headings, bold, bullet and numbered lists
const extensions = [
  StarterKit.configure({
    heading: { levels: [2, 3, 4] },
    italic: false,
    strike: false,
    underline: false,
    code: false,
    codeBlock: false,
    blockquote: false,
    horizontalRule: false,
    link: false,
  }),
  Markdown,
  // Block images, saved as ![alt](url) on their own line
  Image.configure({ inline: false }),
  Placeholder.configure({ placeholder: 'Write the full blog article here…' }),
];

// "bridal-lehenga_look 2.jpg" -> "bridal lehenga look 2", used as the image's alt text
function altFromFileName(name: string) {
  return name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
}

type Tool = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  run: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
};

const TOOLS: Tool[] = [
  {
    label: 'Paragraph',
    icon: Pilcrow,
    run: (e) => e.chain().focus().setParagraph().run(),
    isActive: (e) => e.isActive('paragraph') && !e.isActive('bulletList') && !e.isActive('orderedList'),
  },
  { label: 'Heading', icon: Heading2, run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(), isActive: (e) => e.isActive('heading', { level: 2 }) },
  { label: 'Subheading', icon: Heading3, run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(), isActive: (e) => e.isActive('heading', { level: 3 }) },
  { label: 'Small Heading', icon: Heading4, run: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(), isActive: (e) => e.isActive('heading', { level: 4 }) },
  { label: 'Bold', icon: Bold, run: (e) => e.chain().focus().toggleBold().run(), isActive: (e) => e.isActive('bold') },
  { label: 'Bullet List', icon: List, run: (e) => e.chain().focus().toggleBulletList().run(), isActive: (e) => e.isActive('bulletList') },
  { label: 'Numbered List', icon: ListOrdered, run: (e) => e.chain().focus().toggleOrderedList().run(), isActive: (e) => e.isActive('orderedList') },
  { label: 'Undo', icon: Undo2, run: (e) => e.chain().focus().undo().run() },
  { label: 'Redo', icon: Redo2, run: (e) => e.chain().focus().redo().run() },
];

// WordPress-style visual editor: formatting shows as you type (no ** or ### visible),
// while the post is still saved as the Markdown the blog page renders.
export default function BlogBodyEditor({ value, onChange }: BlogBodyEditorProps) {
  // Markdown last sent to the parent, so our own edits aren't loaded back into the editor
  const lastEmitted = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState('');

  const editor = useEditor({
    extensions,
    content: toBlockMarkdown(value),
    contentType: 'markdown',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'min-h-[320px] max-h-[560px] overflow-y-auto px-4 py-3 text-sm text-stone-800 leading-relaxed focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.isEmpty ? '' : decodeEntities(editor.getMarkdown());
      lastEmitted.current = markdown;
      onChange(markdown);
    },
  });

  // Load content set from outside (e.g. opening a different post for editing)
  useEffect(() => {
    if (!editor || value === lastEmitted.current) return;
    lastEmitted.current = value;
    editor.commands.setContent(toBlockMarkdown(value), { contentType: 'markdown', emitUpdate: false });
  }, [editor, value]);

  // Uploads the picked image to Cloudinary and inserts it at the cursor
  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !editor) return;
    if (!file.type.startsWith('image/')) {
      setImageError('Please choose an image file (JPG, PNG or WebP).');
      return;
    }

    setUploadingImage(true);
    setImageError('');
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('resource_type', 'image');
      data.append('cloud_only', 'true');
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.url) {
        throw new Error(result.error || 'Image upload failed');
      }
      editor.chain().focus().setImage({ src: result.url, alt: altFromFileName(file.name) }).run();
    } catch (err) {
      setImageError((err as Error).message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const activeTools = useEditorState({
    editor,
    selector: ({ editor }) => (editor ? TOOLS.map((tool) => Boolean(tool.isActive?.(editor))) : []),
  });

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#8b1828]/20">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-stone-50 border-b border-stone-200">
        {TOOLS.map((tool, i) => {
          const Icon = tool.icon;
          const active = activeTools?.[i];
          return (
            <button
              key={tool.label}
              type="button"
              title={tool.label}
              aria-label={tool.label}
              aria-pressed={tool.isActive ? Boolean(active) : undefined}
              disabled={!editor}
              onClick={() => editor && tool.run(editor)}
              className={`p-1.5 rounded-md transition-all cursor-pointer disabled:opacity-40 ${
                active
                  ? 'bg-[#8b1828] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-white hover:text-[#8b1828] hover:shadow-sm'
              } ${tool.label === 'Undo' ? 'ml-auto order-2' : tool.label === 'Redo' ? 'order-2' : ''}`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}

        <button
          type="button"
          title="Add Image"
          aria-label="Add Image"
          disabled={!editor || uploadingImage}
          onClick={() => fileInputRef.current?.click()}
          className="order-1 inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-semibold text-stone-600 hover:bg-white hover:text-[#8b1828] hover:shadow-sm disabled:opacity-50 transition-all cursor-pointer"
        >
          {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
          <span>{uploadingImage ? 'Uploading…' : 'Image'}</span>
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
      </div>

      {imageError && (
        <p className="px-3 py-1.5 text-xs text-red-600 bg-red-50 border-b border-red-100" role="alert">
          {imageError}
        </p>
      )}

      {/* Editing area, styled like the published article */}
      <EditorContent
        editor={editor}
        className="[&_h2]:[font-family:var(--font-serif),serif] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-stone-900 [&_h2]:mt-5 [&_h2]:mb-2
          [&_h3]:[font-family:var(--font-serif),serif] [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#8b1828] [&_h3]:mt-5 [&_h3]:mb-2
          [&_h4]:[font-family:var(--font-serif),serif] [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-stone-900 [&_h4]:mt-4 [&_h4]:mb-1.5
          [&_p]:mb-3 [&_strong]:font-bold [&_strong]:text-stone-950
          [&_img]:block [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-4 [&_img.ProseMirror-selectednode]:ring-2 [&_img.ProseMirror-selectednode]:ring-[#8b1828]
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_li]:my-1 [&_li_p]:mb-0
          [&_.is-editor-empty:first-child]:before:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child]:before:text-stone-400
          [&_.is-editor-empty:first-child]:before:float-left [&_.is-editor-empty:first-child]:before:h-0 [&_.is-editor-empty:first-child]:before:pointer-events-none"
      />
    </div>
  );
}
