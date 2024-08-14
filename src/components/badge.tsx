export default function Badge({ initials }: { initials: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <span className="text-xs font-semibold text-white">{initials}</span>
    </div>
  );
}
