type ButtonProps = {
  name: string;
};

export function Button({ name }: ButtonProps) {
  return (
    <>
      <button className="rounded-2xl bg-gray-700 p-4 cursor-pointer hover:shadow-lg hover:shadow-white hover:-translate-y-2">
        {name}
      </button>
    </>
  );
}
