import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { ScrollView} from '@tarojs/components';
import SearchBar from '@/components/SearchBar';
import Layout from '@/components/Layout';
import Banner from '@/pages/Home2/components/Banner';
import Category from '@/pages/Home2/components/Category';
import Recommend from '@/pages/Home2/components/Recommend';
import NewSong from '@/pages/Home2/components/NewSong';

import './index.scss';

export default function Home() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (IS_H5) {
      window.document.addEventListener('scroll', onScroll);
    }
    return () => {
      if (IS_H5)
        window.document.removeEventListener('scroll', onScroll);
    };
  }, []);

  function onScroll(e) {
    let scrollTop;
    if (IS_H5) {
      scrollTop = document.documentElement.scrollTop;
    } else {
      scrollTop = e.detail.scrollTop;
    }
    if (scrollTop > 0) {
      setTimeout(() => {
        setIsScrolling(true);
      }, 50);
    } else {
      setTimeout(() => {
        setIsScrolling(false);
      }, 50);
    }
  }
  const info = Taro.getSystemInfoSync()
  const { windowHeight } = info
  return (
    <Layout outerStyle={{ backgroundColor: '#fff' }}>
      <SearchBar isScrolling={isScrolling} />
      <ScrollView
        scrollY
        style={{ backgroundColor: '#eee' ,height: IS_WEAPP ? windowHeight : '100%'}}
        onScroll={onScroll}
      >
        <Banner />
        <Category />
        <Recommend />
        <NewSong />
      </ScrollView>
    </Layout>
  );
}
