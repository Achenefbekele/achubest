import React from 'react';
import NewsCard from './ui/NewsCard';
import articles from '@/data/articles';

export default function LatestNewsOrUpdates() {
    // Sort articles by date in descending order and take the top 3
    const topArticles = articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    return (
        <div className="bg-gray-800 h-auto flex flex-col items-center py-20">
            <div className="flex flex-wrap justify-center items-center">
                {topArticles.map((article, index) => (
                    <NewsCard
                        key={index}
                        {...article}
                    />
                ))}
            </div>
        </div>
    );
}