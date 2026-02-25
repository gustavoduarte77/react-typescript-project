import Button from "../components/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1d1b1b]">
      <div className="flex justify-center text-white p-4 text-3xl font-bold">
        Bem-Vindo!
      </div>

      <div className="flex justify-center gap-4 p-4">
        <Button to="/todo">ToDo-List</Button>
        <Button to="/contacts">Contacts</Button>
        <Button to="/finance">Finance</Button>
      </div>
    </div>
  );
}