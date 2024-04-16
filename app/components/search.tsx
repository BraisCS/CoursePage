import React, { useState } from 'react';
import Image from 'next/image';

export default function Search(){

  return (

<fieldset className='relative flex flex-row justify-start items-start'>
    <input 
            className='rounded-xl pl-4 py-1' 
            type="text" 
            placeholder='Buscar un curso...' 
    />
{/*     <div className="absolute px-2 top-1/2 transform -translate-y-1/2">
      <Image src={"/search.svg"} alt='Buscador' height={15} width={15} />
    </div> */}
</fieldset>


  );
};
