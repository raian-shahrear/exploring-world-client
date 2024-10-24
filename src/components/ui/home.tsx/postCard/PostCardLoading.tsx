const PostCardLoading = () => {
  return (
    <div className="border rounded-lg p-6">
      <div>
        <div className="grid grid-cols-[36px_auto] items-center gap-2">
          <div className="skeleton rounded-full border w-9 h-9"></div>
          <div className="flex flex-col gap-2">
            <p className="skeleton w-20 h-4"></p>
            <p className="skeleton w-20 h-3"></p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="skeleton w-full h-52 rounded-md"></div>
      </div>

      <div className="mt-6">
        <p className="skeleton w-20 h-4"></p>
        <p className="skeleton h-3 w-20 mt-2"></p>
        <div className="mt-3 flex flex-col gap-1">
          {Array.from({ length: 10 }).map((_, idx) => (
            <p key={idx} className="skeleton w-full h-3"></p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCardLoading;
