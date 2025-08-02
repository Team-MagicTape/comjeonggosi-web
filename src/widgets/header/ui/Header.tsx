export const revalidate = 60 * 60 * 24 * 10;

const Header = () => {
  return (
    <header className="w-full fixed top-6 z-10 flex justify-center">
      <div className="w-full max-w-334 h-20 bg-white border border-border rounded-2xl px-8 flex items-center">
        <h1 className="text-primary text-3xl font-black">COMJEONGGOSI</h1>
      </div>
    </header>
  )
}

export default Header