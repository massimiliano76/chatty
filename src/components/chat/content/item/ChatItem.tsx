import React from 'react';
import "./chatitem.css";

type PropType = {item: {message:string, author:string}, author: string};

export default function ChatItem({ item, author }: PropType) {
    const isMyself = author === item.author;

    return (
        <div className={`chatBaloon__container${!isMyself ? ' chatBaloon__container--friend' : ''}`}>
            <div className={`chatBaloon${!isMyself ? ' chatBaloon--friend' : ''}`}>
                <div className={`chatBaloon__message${!isMyself ? ' chatBaloon__message--friend' : ''}`}>{item.message}</div>
            </div>
            {   
                !isMyself && <div className="chatBaloon__author">{item.author}</div>
            }
        </div>
    );
}