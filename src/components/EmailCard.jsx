export default function EmailComponent ({ fromEmail, toEmail, subject, body }){
  return (
    <div className="dark:bg-[#141517] bg-white border dark:border-[#343A40] mx-8 rounded-md my-3">
      <div className="p-4">
        <div className="flex justify-between py-4">
          <div className="space-y-2">
            <div className="font-bold dark:text-white text-black">
              {subject}
            </div>
            <div className="dark:text-[#AEAEAE] text-[#637381] text-sm">
              from: {fromEmail}
            </div>
            <div className="dark:text-[#AEAEAE] text-[#637381] text-sm">
              to: {toEmail}
            </div>
          </div>
          <div className="text-sm dark:text-[#7F7F7F] text-[#637381]">
            20 June 2022 : 9:16AM
          </div>
        </div>
        <div
          className="py-4 dark:text-[#E1E0E0] text-[#172B4D] w-2/3"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
};
