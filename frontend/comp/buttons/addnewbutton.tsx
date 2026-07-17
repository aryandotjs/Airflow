type AddNewButtonProps = {
  onClick?: () => void;
  text?: string;
};

export default function AddNewButton({
  onClick,
  text = "Add New",
}: AddNewButtonProps) {
  return (
    <button
      onClick={onClick}
      className=" inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-neutral-900 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-200 dark:bg-white dark:text-black dark:hover:bg-neutral-100">
      <span className="text-lg font-light leading-none">+</span>
      <span>{text}</span>
    </button>
  );
}