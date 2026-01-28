export const SkeletonBuildingCard = () => {
  return (
    <div className="card-building animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded-full w-16" />
          <div className="h-6 bg-muted rounded-full w-20" />
          <div className="h-6 bg-muted rounded-full w-16" />
        </div>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-8 h-8 bg-muted rounded-lg" />
          ))}
        </div>
        <div className="h-10 bg-muted rounded-xl" />
      </div>
    </div>
  );
};

export const SkeletonFlatCard = () => {
  return (
    <div className="card-building animate-pulse">
      <div className="aspect-[16/10] bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded w-2/3" />
        <div className="flex gap-4">
          <div className="h-4 bg-muted rounded w-16" />
          <div className="h-4 bg-muted rounded w-16" />
          <div className="h-4 bg-muted rounded w-16" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-muted rounded-full w-20" />
          <div className="h-9 bg-muted rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonGallery = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/9] bg-muted rounded-2xl mb-4" />
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="w-20 h-20 bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  );
};
