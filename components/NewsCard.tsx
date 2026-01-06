import React from 'react';
import { Newspaper } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <div className="border-l-4 border-ecu-purple bg-white shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold tracking-wider text-ecu-gold bg-ecu-darkPurple px-2 py-1 rounded">
          {item.category.toUpperCase()}
        </span>
        <span className="text-sm text-gray-400">{item.date}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-ecu-purple cursor-pointer">
        {item.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-3">
        {item.summary}
      </p>
      <div className="flex items-center text-sm text-gray-500">
        <Newspaper className="w-4 h-4 mr-2" />
        <span>Posted by {item.author}</span>
        <button className="ml-auto text-ecu-purple font-semibold hover:underline">Read More</button>
      </div>
    </div>
  );
};

export default NewsCard;