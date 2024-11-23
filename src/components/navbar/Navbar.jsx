import { useState } from "react"
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon,MagnifyingGlassIcon,UserIcon,ShoppingCartIcon  } from '@heroicons/react/24/outline';
import { NavLink } from "react-router-dom";

const Header = () => {

   const navigation = [
      { name: 'Inicio', href: '/' },
      { name: 'Productos', href: '/collection' },
      { name: 'Nosotros', href: '/about' },
      { name: 'Contacto', href: '/contact' },
   ]

   // useState: nos permite manejar el estado de un componente funcional, en este caso para manejar el estado del menú móvil
   // setMobileMenuOpen: función que nos permite cambiar el estado de mobileMenuOpen, en este caso para abrir y cerrar el menú móvil
   // mobileMenuOpen: estado que nos permite saber si el menú móvil está abierto o cerrado, en este caso para mostrar u ocultar el menú móvil en la interfaz de usuario
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  return (
   <div className="bg-white dark:bg-gray-900">
   <header className="absolute inset-x-0 top-0 z-50">
     <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
       <div className="flex lg:flex-1">
         <a href="#" className="-m-1.5 p-1.5">
           <span className="sr-only">Your Company</span>
           <img
             alt=""
             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
             className="h-8 w-auto"
           />
         </a>
       </div>
       <div className="flex lg:hidden">
         <button
           type="button"
           onClick={() => setMobileMenuOpen(true)}
           className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
         >
           <span className="sr-only">Open main menu</span>
           <Bars3Icon aria-hidden="true" className="h-6 w-6" />
         </button>
       </div>
       <div className="hidden lg:flex lg:gap-x-12">
         {navigation.map((item) => (
           <NavLink key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900">
             {item.name}
           </NavLink>
         ))}
       </div>
       <div className="hidden lg:flex lg:flex-1 lg:gap-5 lg:justify-end lg:items-center">
       <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6 text-gray-900 cursor-pointer" />
         <NavLink to="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
           <UserIcon className="h-6 w-6 text-gray-900 cursor-pointer" />
         </NavLink>
         <ShoppingCartIcon className="h-6 w-6 text-gray-900 cursor-pointer" />
       </div>
     </nav>
     <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
       <div className="fixed inset-0 z-50" />
       <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
         <div className="flex items-center justify-between">
           <a href="#" className="-m-1.5 p-1.5">
             <span className="sr-only">Your Company</span>
             <img
               alt=""
               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
               className="h-8 w-auto"
             />
           </a>
           <button
             type="button"
             onClick={() => setMobileMenuOpen(false)}
             className="-m-2.5 rounded-md p-2.5 text-gray-700"
           >
             <span className="sr-only">Close menu</span>
             <XMarkIcon aria-hidden="true" className="h-6 w-6" />
           </button>
         </div>
         <div className="mt-6 flow-root">
           <div className="-my-6 divide-y divide-gray-500/10">
             <div className="space-y-2 py-6">
               {navigation.map((item) => (
                 <NavLink
                   key={item.name}
                   to={item.href}
                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                 >
                   {item.name}
                 </NavLink>
               ))}
             </div>
             <div className="py-6">
               <NavLink
                 to="/login"
                 className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
               >
                 Log in
               </NavLink>
             </div>
           </div>
         </div>
       </DialogPanel>
     </Dialog>
   </header>
 </div>
  )
}

export default Header