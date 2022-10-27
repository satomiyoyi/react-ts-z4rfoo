import React, {
  useState, useEffect
} from 'react';
import { imgListRes, tagListRes } from './api.interface';
import Detail from "./detail";
import "./setRootFontSize";
import './style.css';

export default function App() {
  const [tagList, setTagList] = useState<tagListRes[]>([{
    id: "0",
    title: "全部",
    category: "all",
    priority: 0,
  }]);
  const [imgList, setImagList] = useState<imgListRes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(tagList[0].category);
  const [selectedImages, setSelectedImages] = useState<imgListRes[]>([]);
  useEffect(() => {
    window.fetch("/tagList").then((res) => res.json()).then((res) => setTagList([...tagList, ...res]));
    window.fetch("/imgList").then((res) => res.json()).then((res) => {
      setImagList(res);
      setSelectedImages(res);
    });
  }, [])
  const selectCallback = function (category) {
    setSelectedCategory(category);
    setSelectedImages(imgList.filter((item) => category === "all" || item.category === category));
  }
  return (
    <div>
      <ul className='tagContainer'>
        {
          tagList.sort((a, b) => a.priority - b.priority).map((item) => (
            <li onClick={() => { selectCallback(item.category) }}
              key={item.id}
              className={item.category === selectedCategory ? "selectedTag tag" : "tag"}
            >
              {item.title}
            </li>
          ))
        }
      </ul>
      <ul className='imageContainer'>
        {selectedImages.map((item) => (<img src={item.img} className="imgItem"/>))}
      </ul>
      <Detail></Detail>
    </div>
  );
}
