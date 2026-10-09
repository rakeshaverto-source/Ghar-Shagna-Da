import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import HeroSlide from '@/models/HeroSlide';
import SiteSettings from '@/models/SiteSettings';
import { verifyAdminSession } from '@/lib/auth';

const DEFAULT_HERO_SLIDES = [
  {
    slideId: 'slide-1',
    desktopImage: '/creative-bridal.jpg',
    mobileImage: '/mobile-bridal.jpg',
    subtitle: 'CRAFTED TO CELEBRATE',
    headingPrefix: 'SHAGNA DI',
    headingHighlight: 'Raat',
    tagline: 'TIMELESS DESIGNS. SHAHI ANDAAZ.',
    subtagline: 'Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent.',
    ctaText: 'Explore Bridal Rentals',
    ctaLink: '/category/bridal-lehengas',
    theme: 'warm',
    order: 1,
  },
  {
    slideId: 'slide-2',
    desktopImage: '/creative-groom.jpg',
    mobileImage: '/mobile-groom.jpg',
    subtitle: 'HERITAGE ROOTS.',
    headingPrefix: 'SHAHI',
    headingHighlight: 'Dulha',
    tagline: 'TRADITIONAL WEAR, REDEFINED.',
    subtagline: 'Shaandaar groom sherwanis & achkans, tailored to your perfection.',
    ctaText: 'Explore Groom Rentals',
    ctaLink: '/category/sherwanis',
    theme: 'dark',
    order: 2,
  },
];

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ 
        slides: DEFAULT_HERO_SLIDES, 
        isHeroEnabled: true,
        heroMediaMode: 'video', 
        videoUrl: '/luxury_lehengas.mp4' 
      });
    }

    const count = await HeroSlide.countDocuments();
    if (count === 0) {
      await HeroSlide.insertMany(DEFAULT_HERO_SLIDES);
    }

    const slides = await HeroSlide.find().sort({ order: 1 });
    
    // Fetch or create site settings
    let settings = await SiteSettings.findOne({ key: 'global' });
    if (!settings) {
      settings = await SiteSettings.create({
        key: 'global',
        isHeroEnabled: true,
        heroMediaMode: 'video',
        videoUrl: '/luxury_lehengas.mp4',
      });
    }

    return NextResponse.json({ 
      slides, 
      isHeroEnabled: settings.isHeroEnabled !== false,
      heroMediaMode: settings.heroMediaMode || 'video',
      videoUrl: settings.videoUrl || '/luxury_lehengas.mp4',
      videoHeadingPrefix: settings.videoHeadingPrefix || 'SHAGNA DI',
      videoHeadingHighlight: settings.videoHeadingHighlight || 'Raat',
      videoTagline: settings.videoTagline || 'TIMELESS DESIGNS. SHAHI ANDAAZ.',
      videoSubtagline: settings.videoSubtagline || 'Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent.',
      videoCtaText: settings.videoCtaText || 'Explore Bridal Rentals',
      videoCtaLink: settings.videoCtaLink || '/category/bridal-lehengas',
      googleSearchConsoleToken: settings.googleSearchConsoleToken || '',
      googleAnalyticsId: settings.googleAnalyticsId || '',
      metaPixelId: settings.metaPixelId || '',
      customSchemaJson: settings.customSchemaJson || '',
      pageSeoList: settings.pageSeoList || [],
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ 
      error: error.message, 
      slides: DEFAULT_HERO_SLIDES, 
      isHeroEnabled: true,
      heroMediaMode: 'video',
      videoUrl: '/luxury_lehengas.mp4',
      videoHeadingPrefix: 'SHAGNA DI',
      videoHeadingHighlight: 'Raat',
      videoTagline: 'TIMELESS DESIGNS. SHAHI ANDAAZ.',
      videoSubtagline: 'Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent.',
      videoCtaText: 'Explore Bridal Rentals',
      videoCtaLink: '/category/bridal-lehengas',
      googleSearchConsoleToken: '',
      googleAnalyticsId: '',
      metaPixelId: '',
      customSchemaJson: '',
      pageSeoList: [],
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const body = await req.json();
    const slideId = body.slideId || `hero-${Date.now()}`;

    const newSlide = await HeroSlide.create({
      ...body,
      slideId,
      isVisible: body.isVisible !== undefined ? body.isVisible : true,
    });

    return NextResponse.json({ success: true, slide: newSlide });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const body = await req.json();

    // Check if updating site/hero settings (e.g. isHeroEnabled, heroMediaMode, videoUrl, tracking IDs)
    if (
      body.action === 'update_settings' || 
      body.isHeroEnabled !== undefined || 
      body.heroMediaMode !== undefined || 
      body.videoUrl !== undefined ||
      body.videoHeadingPrefix !== undefined ||
      body.googleSearchConsoleToken !== undefined ||
      body.googleAnalyticsId !== undefined ||
      body.metaPixelId !== undefined ||
      body.customSchemaJson !== undefined ||
      body.pageSeoList !== undefined
    ) {
      const updateFields: { 
        isHeroEnabled?: boolean; 
        heroMediaMode?: 'video' | 'image'; 
        videoUrl?: string;
        videoHeadingPrefix?: string;
        videoHeadingHighlight?: string;
        videoTagline?: string;
        videoSubtagline?: string;
        videoCtaText?: string;
        videoCtaLink?: string;
        googleSearchConsoleToken?: string;
        googleAnalyticsId?: string;
        metaPixelId?: string;
        customSchemaJson?: string;
        pageSeoList?: unknown;
      } = {};
      if (body.isHeroEnabled !== undefined) updateFields.isHeroEnabled = Boolean(body.isHeroEnabled);
      if (body.heroMediaMode) updateFields.heroMediaMode = body.heroMediaMode;
      if (body.videoUrl !== undefined) updateFields.videoUrl = body.videoUrl;
      if (body.videoHeadingPrefix !== undefined) updateFields.videoHeadingPrefix = body.videoHeadingPrefix;
      if (body.videoHeadingHighlight !== undefined) updateFields.videoHeadingHighlight = body.videoHeadingHighlight;
      if (body.videoTagline !== undefined) updateFields.videoTagline = body.videoTagline;
      if (body.videoSubtagline !== undefined) updateFields.videoSubtagline = body.videoSubtagline;
      if (body.videoCtaText !== undefined) updateFields.videoCtaText = body.videoCtaText;
      if (body.videoCtaLink !== undefined) updateFields.videoCtaLink = body.videoCtaLink;
      if (body.googleSearchConsoleToken !== undefined) updateFields.googleSearchConsoleToken = body.googleSearchConsoleToken;
      if (body.googleAnalyticsId !== undefined) updateFields.googleAnalyticsId = body.googleAnalyticsId;
      if (body.metaPixelId !== undefined) updateFields.metaPixelId = body.metaPixelId;
      if (body.customSchemaJson !== undefined) updateFields.customSchemaJson = body.customSchemaJson;
      if (body.pageSeoList !== undefined) updateFields.pageSeoList = body.pageSeoList;

      const settings = await SiteSettings.findOneAndUpdate(
        { key: 'global' },
        { $set: updateFields },
        { new: true, upsert: true }
      );

      return NextResponse.json({
        success: true,
        settings,
      });
    }

    const { _id, slideId, ...updateData } = body;

    const updated = await HeroSlide.findOneAndUpdate(
      { $or: [{ _id: _id }, { slideId: slideId }] },
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json({ success: true, slide: updated });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Slide ID required' }, { status: 400 });
    }

    await HeroSlide.findOneAndDelete({ $or: [{ _id: id }, { slideId: id }] });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
