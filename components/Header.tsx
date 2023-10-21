"use client"
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiHome, BiSearch } from "react-icons/bi";
import {FaUserAlt} from "react-icons/fa";
import { toast } from "react-hot-toast";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

interface HeaderProps{
    children: React.ReactNode,
    className ?: string
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {

    const AuthModal = useAuthModal();
    const router=useRouter();

    const supabaseClient = useSupabaseClient();
    const {user} = useUser();

    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut();
        //TODO Reset any current playing song
        router.refresh();

        if(error){
            console.log(error);
            toast.error(error.message);
        }else{
            toast.success("Logged out");
        }
    }
  return (
    <div className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
    `, className)}>
        <div className="
            w-full
            mb-4
            flex
            items-center
            justify-between
        ">
            <div className="
                hidden
                md:flex
                gap-x-2
                items-center
            ">
                <button
                    onClick={() => router.back()} 
                    className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                ">
                    <RxCaretLeft size={35} className="text-white" />
                </button>
                <button 
                    onClick={() => router.forward()}
                    className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                ">
                    <RxCaretRight size={35} className="text-white" />
                </button>
            </div>
            <div className="
                flex
                md:hidden
                gap-x-2
                items-center
            ">
                <button className="
                    rounded-full
                    p-2
                    bg-white
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                ">
                    <HiHome className="text-black"  size={20} />
                </button>
                <button className="
                    rounded-full
                    p-2
                    bg-white
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                ">
                    <BiSearch className="text-black"  size={20} />
                </button>
            </div>
            <div className="
                flex
                items-center
                justify-between
                gap-x-4
            ">  
                {user ? (
                    <div className="flex gap-x-4 items-center">
                        <Button
                            onClick={handleLogout}
                            className="bg-white px-6 py-2"
                        >
                            Logout
                        </Button>
                        <Button
                            onClick={() => router.push('/account')}
                            className="bg-white"
                        >
                            <FaUserAlt />
                        </Button>
                    </div>
                ) : (
                    <>
                        <div>
                            <Button
                                onClick={AuthModal.onOpen}
                                className="
                                    bg-transparent
                                    text-neutral-300
                                    font-medium
                                " 
                            >
                                Signup
                            </Button>
                        </div>
                        <div>
                            <Button
                                    onClick={AuthModal.onOpen}
                                    className="
                                        bg-white
                                        px-6
                                        py-2
                                    " 
                                >
                                Login
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
        {children}
    </div>
  )
}

export default Header