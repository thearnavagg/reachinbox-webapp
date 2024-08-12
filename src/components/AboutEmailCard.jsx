import React from "react";

export default function AboutEmailComponent({
  isRead,
  fromEmail,
  sentAt,
  subject,
}) {
  const formattedDate = new Date(sentAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group flex items-center gap-1 rounded-md bg-white dark:bg-black px-5 py-1 hover:bg-gray-100">
      <div className="flex-1 truncate">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isRead && <span className="h-2 w-2 rounded-full bg-blue-500" />}
            <p className="text-[12px] font-medium line-clamp-1 text-gray-900 dark:text-gray-100">
              {fromEmail}
            </p>
          </div>
          <p
            className="text-[9px] text-gray-500 dark:text-gray-400"
            style={{ marginLeft: "8px" }}
          >
            {formattedDate}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">
            {subject.length > 25 ? `${subject.slice(0, 25)}...` : subject}
          </p>
        </div>
      </div>
    </div>
  );
}
