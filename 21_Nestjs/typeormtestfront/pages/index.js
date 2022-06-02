import Head from 'next/head'
import { useEffect } from 'react';
import styled from 'styled-components';
import useAmmo from '../hooks/useAmmo';


export default function Home() {
  const ammo = useAmmo();

  useEffect(() => {
    ammo.getAmmo();
  }, [])

  useEffect(()=>{
    
  })

  return (
    <>
      <div>
        <h1>KCTC 훈련을 합시다</h1>
        <h1>Welcome to Nonsan City</h1>
      </div>

      <KctcContainer>
        <AmmoSection>
          <h1>음</h1>
        </AmmoSection>

        <SoliderSection>
          <h1>음</h1>
        </SoliderSection>

      </KctcContainer>
    </>
  );
}

const KctcContainer = styled.div`
display:flex;
`

const AmmoSection = styled.div`
flex-basis: 50%;
background-color : blue;
`

const SoliderSection = styled.div`
flex-basis:50%;
background-color: red;
`



