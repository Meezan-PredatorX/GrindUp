export const DashboardNavbar = ({name}: {name: string}) => {
   return (
      <nav className="p-6 w-full h-10 rounded">
         <h1 className="text-4xl font-bold">Welcome {name}</h1>
      </nav>
   );
}