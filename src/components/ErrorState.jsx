export default function ErrorState({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-5">

      <h2 className="font-bold mb-2">

        Something went wrong

      </h2>

      <p>

        {message}

      </p>

    </div>
  );
}