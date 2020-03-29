import React from 'react'
import Link from 'next/link'
import { FiHash } from 'react-icons/fi'

interface TagListProps {
  tags: string[]
}

const TagList: React.FC<TagListProps> = ({ tags }) => (
  <ul className="-mx-1">
    {tags.map(tag => (
      <li key={tag} className="inline">
        <Link href={{ pathname: '/tags', query: { tag } }} as={`/tags/${tag}`}>
          <a
            className="text-xs hover:bg-primary hover:text-white hover:no-underline italic px-1 rounded-sm whitespace-no-wrap"
            title={tag}
          >
            <FiHash />
            {tag}
          </a>
        </Link>
      </li>
    ))}
  </ul>
)

export default TagList
