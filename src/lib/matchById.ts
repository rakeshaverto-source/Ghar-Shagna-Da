const OBJECT_ID = /^[0-9a-f]{24}$/i;

// Filter that finds a document by its Mongo _id or by a custom string id field
// (e.g. "blog-3" or "slide-1"). Values that aren't ObjectIds are never compared
// against _id, since Mongoose throws "Cast to ObjectId failed" for those.
// Returns null when no usable id was given.
export function matchById(field: string, ...values: (string | null | undefined)[]) {
  const conditions: Record<string, string>[] = [];
  for (const value of values) {
    if (!value || typeof value !== 'string') continue;
    if (OBJECT_ID.test(value)) conditions.push({ _id: value });
    conditions.push({ [field]: value });
  }
  return conditions.length > 0 ? { $or: conditions } : null;
}
