export default function Loading() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-pulse">
      <div className="h-8 bg-muted rounded-lg w-48" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-muted rounded-xl" />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="h-5 bg-muted rounded w-40" />
          <div className="h-48 bg-muted rounded-xl" />
          <div className="h-5 bg-muted rounded w-40 mt-4" />
          <div className="h-48 bg-muted rounded-xl" />
        </div>
        <div className="space-y-3">
          <div className="h-5 bg-muted rounded w-32" />
          <div className="h-56 bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}
