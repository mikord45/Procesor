import React, { useState } from 'react';
import Head from 'next/head';
import Button from "../components/Button";

const Home = () => {
  const [registers, setRegisters] = useState({
    AX: "",
    BX: "",
    CX: "",
    DX: "",
  });
  const [orders] = useState({
    MOV: {
      action: (registersCopy, dst, src) => {
        registersCopy[dst] = registersCopy[src];
        registersCopy[src] = "";
        return registersCopy;
      }
    },
    XCHG: {
      action: (registersCopy, dst, src) => {
        let dstCopy = registersCopy[dst];
        registersCopy[dst] = registersCopy[src];
        registersCopy[src] = dstCopy;
        return registersCopy;
      }
    }
  });

  const handleClick = (event) => {
    let order = orders[event.target.getAttribute('order')];
    let dst = event.target.getAttribute('dst');
    let src = event.target.getAttribute('src');
    let registersCopy = { ...registers };
    setRegisters(order.action(registersCopy, dst, src));
  }
  const handleChange = (event) => {
    let value = event.target.value;
    let order = event.target.name;
    if (isHexadecimal(value)) {
      let registersCopy = { ...registers };
      registersCopy[order] = value;
      setRegisters(registersCopy);
    }
    ;
  };
  const isHexadecimal = (h) => {
    var a = parseInt(h, 16);
    return (a.toString(16) === h.toLowerCase() || h === '');
  };
  const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  const random = () => {
    let Hex1 = genRanHex(4)
    let Hex2 = genRanHex(4)
    let Hex3 = genRanHex(4)
    let Hex4 = genRanHex(4)
    let random = {
      AX: Hex1,
      BX: Hex2,
      CX: Hex3,
      DX: Hex4,
    }
    setRegisters(random);
  };
  const reset = () => {
    let random = {
      AX: "",
      BX: "",
      CX: "",
      DX: "",
    }
    setRegisters(random);
  };
  return (
    <>
      <Head>
        <title>Symulator</title>
      </Head>
      <div className="text-center py-8 text-3xl">
        Projekt zaliczeniowy Mikołaj Stryczek
      </div>
      <div className="flex flex-row-reverse">
        <div className='flex flex-col w-1/2 gap-4 m-4 items-start justify-center'>
          <div className="flex gap-4">
            <button className="btn" onClick={() => random()}>random</button>
            <button className="btn" onClick={() => reset()}>reset</button>
          </div>
          <div className="flex flex-col gap-4">
            <label>
              AX
              <input type="text" name="AX" maxLength="4" value={registers.AX} onChange={(event) => handleChange(event)} />
            </label>
            <label>
              BX
              <input type="text" name="BX" maxLength="2" value={registers.BX} onChange={(event) => handleChange(event)} />
            </label>
            <label>
              CX
              <input type="text" name="CX" maxLength="2" value={registers.CX} onChange={(event) => handleChange(event)} />
            </label>
            <label>
              DX
              <input type="text" name="DX" maxLength="2" value={registers.DX} onChange={(event) => handleChange(event)} />
            </label>
          </div>
        </div>
        <div className='flex flex-row w-1/2 gap-4 m-4 justify-end'>
          <div className='flex flex-col w-1/4 gap-4'>
            <Button order="MOV" dst="AX" src="BX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="AX" src="DX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="AX" src="CX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="BX" src="AX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="BX" src="CX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="BX" src="DX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="CX" src="AX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="CX" src="BX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="CX" src="DX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="DX" src="AX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="DX" src="BX" onClick={(event) => handleClick(event)} />
            <Button order="MOV" dst="DX" src="CX" onClick={(event) => handleClick(event)} />
          </div>
          <div className='flex flex-col w-1/4 gap-4'>
            <Button order="XCHG" dst="AX" src="BX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="AX" src="DX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="AX" src="CX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="BX" src="AX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="BX" src="CX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="BX" src="DX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="CX" src="AX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="CX" src="BX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="CX" src="DX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="DX" src="AX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="DX" src="BX" onClick={(event) => handleClick(event)} />
            <Button order="XCHG" dst="DX" src="CX" onClick={(event) => handleClick(event)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;