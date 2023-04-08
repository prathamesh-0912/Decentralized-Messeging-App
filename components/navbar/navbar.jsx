
import React, {useContext, useEffect, useState} from 'react'
import Image from "next/image";
import Link from "next/link";

//Internal Import
import Style from './navbar.module.css';
import {Chatappcontect} from'../../context/chatapp';
import {Model, Error} from '../index';  
import images from '../../assets';


const navbar = () => {
  const menuItems =[
    {
      menu:"All Users",
      Link :"alluser",
    },
    {
      menu:"Chat",
      Link :"/",
    },
    {
      menu:"Contact",
      Link :"/",
    },
    {
      menu:"Setting",
      Link :"/",
    },
    {
      menu:"FAQ",
      Link :"/",
    },
    {
      menu:"Terms of Use",
      Link :"/",
    },
  ]

  //Use State
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);

  const {account, username, connectwallet} = useContext(Chatappcontect);

  return (
    <div className={Style.navbar}>
      <div classname={Style.navbar_box}>
        <div className={Style.navbar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.navbar_box_right}>
          {/*//Desttop */}
          <div className={Style.navbar_box_right_menu}>
            {menuItems.map((el, i) =>(
              <div onClick={()=> setActive(i+1)} key={i+1} 
              className={`${Style.navbar_box_right_menu_item} 
              ${active == i+1 ? Style.active_btn:" "
              }}`}
              >
                <Link className={Style.navbar_box_right_menu_item_link}
                href = {el.Link}
                >
                  {el.menu}
                </Link>
                
              </div>
            ))}
          </div>
          {/*//Mobile */}
          {open && (  
            <div className={Style.mobile_menu}>
            {menuItems.map((el, i) =>(
              <div onClick={()=> setActive(i+1)} key={i+1} 
              className={`${Style.mobilet_menu_item} 
              ${active == i+1 ? Style.active_btn:" "
              }}`}
              >
                <Link className={Style.mobile_menu_item_link}
                href = {el.Link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}

              <p className={Style.mobile_menu_btn}>
                <Image src={images.close} 
                  alt="Close" width={50} height={50} 
                  onClick={()=>setOpen(false)} />
              </p>

          </div>
          )}

          {/*Connect Wallect*/}
          <div className={Style.navbar_box_right_connect}>
              { account == "" ? (
                <button onClick={() => connectwallet()}>
                  {""}
                  <span>Connect Wallet</span>
                </button>
              ) : (
                <button onClick={() => setOpenmodel(true)}>
                  {""}
                  <Image src={username ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                  />
                  {''}
                  <small>{username || "Create account"}</small>
                </button>
              )}
          </div>

              <div className={Style.navbar_box_right_open}
              onClick={()=> setOpen(true)}>
                <Image src={images.open} 
                alt="open" 
                width={30}
                height={30}/>
              </div>

        </div>
      </div>
    </div>
  );
};

export default navbar
