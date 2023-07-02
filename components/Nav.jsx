"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const SetUpProvidors = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    SetUpProvidors();
  }, []);
  return (
    <nav
      className="
      flex-between w-full mb-16 pt-3
    "
    >
      <Link
        href="/"
        className="
        flex gap-2 items-center
      "
      >
        <Image
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
          src="/assets/images/logo.svg"
        />
        <p className="logo_text">Prompt</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign out
            </button>
            <Link href="/profile">
              <Image
                alt="profile"
                width={37}
                height={37}
                className="object-contain"
                src={session?.user?.image}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile */}

      <div
        className="
        sm:hidden flex relative 
      "
      >
        {session?.user ? (
          <div className="flex">
            <Image
              onClick={() => setToggleDropdown((prev) => !prev )}
              alt="profile"
              width={37}
              height={37}
              className="object-contain"
              src={session?.user?.image}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" 
                onClick={() => setToggleDropdown(false )}
                >
                  My Profile
                </Link>
                <Link href="/create" className="dropdown_link" 
                onClick={() => setToggleDropdown(false )}
                >
                  Create Prompt
                </Link>

                <button onClick={() => {
                  signOut();
                  setToggleDropdown(false );
                }} className="mt-5 w-full black_btn" type="button">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
