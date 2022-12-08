export default function IndexLetter({ letter }: { letter: string }) {
  return (
    <div className="flex justify-center text-sm uppercase md:text-base">
      {letter}
    </div>
  )
}
