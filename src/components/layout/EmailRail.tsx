export default function EmailOptions() {
  const email = "Alexismatamoros1996777@gmail.com";
  const subject = encodeURIComponent("Contact from Portfolio");
  const body = encodeURIComponent("Hi Alexis,");
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  const handleSendEmail = () => {
    window.location.href = mailtoLink;
  };

  return (
    <div className="fixed w-10 bg-black dark:bg-gray-100 right-0 bottom-0 h-auto py-4 px-0 md:px-4 flex flex-col items-center gap-y-6">
      <span className="hidden md:block h-10 md:h-10 w-[1px] bg-white dark:bg-black"></span>
      <button
        className="text-xs text-white dark:text-black vertical-text hover:underline focus:outline-none"
        onClick={handleSendEmail}
        title="Send Email"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        {email}
      </button>
      <span className="hidden md:block h-4 md:h-10 w-[1px] bg-white dark:bg-black"></span>
    </div>
  );
}
