export default function DailyStudyGoal() {
  const percent = 75;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-6">Daily Study Goal</h2>

      <div className="flex items-center gap-6">
        {/* Circular Progress */}
        <div className="relative w-32 h-32">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(#22c55e ${percent * 3.6}deg, #e5e7eb 0deg)`,
            }}
          />
          <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-green-600">
              {percent}%
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          {/* Time Info */}
          <div className="flex gap-8">
            <div>
              <p className="text-xl font-semibold">3h 45m</p>
              <p className="text-sm text-gray-500">Time Spent</p>
            </div>
            <div>
              <p className="text-xl font-semibold">5h</p>
              <p className="text-sm text-gray-500">Daily Goal</p>
            </div>
          </div>

          {/* Task Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span>Completed</span>
              </div>
              <span className="font-medium">3 tasks</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>In Progress</span>
              </div>
              <span className="font-medium">2 tasks</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-400" />
                <span>Pending</span>
              </div>
              <span className="font-medium">1 task</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
