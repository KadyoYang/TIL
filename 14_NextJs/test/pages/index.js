import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BasicNavigation from '../components/basicNavigation/'

export default function Home() {
  return (
    <div>
      <BasicNavigation />
      <h1>Welcome to Next.js</h1>
    </div>
  );
}
