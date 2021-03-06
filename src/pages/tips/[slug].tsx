import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { loadTips, loadTip, TipMap } from 'utils/contents/tips'
import Markdown from 'components/layout/Markdown'
import Layout from 'components/layout/Layout'
import Container from 'components/layout/Container'
import { NextSeo } from 'next-seo'
import ContentFooterNav from 'components/ContentFooterNav'
import TagList from 'components/TagList'
import PublishedAt from 'components/PublishedAt'
import CategoryLabel from 'components/CategoryLabel'
import UpdatedAt from 'components/UpdatedAt'
import { Routes } from 'utils/routes'
import Card from 'components/Card'
import clsx from 'clsx'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: loadTips().map(({ slug }) => Routes.tip(slug).as),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as { slug: string }

  const tipMap = loadTip(slug)

  return {
    props: tipMap,
  }
}

const TipsPage: NextPage<TipMap> = ({ tip, prev, next }) => {
  const { slug, description, title, publishedAt, updatedAt, content, tags } = tip

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description: description,
          url: `${process.env.SITE_URL}${Routes.tip(slug).as}`,
          type: 'article',
          article: {
            publishedTime: publishedAt,
            modifiedTime: updatedAt,
            authors: ['lailo'],
            tags: tags,
          },
        }}
      />
      <Layout>
        <Container className="mt-4 md:mt-8" size="medium">
          <article id="tip-container">
            <Card className="border-none md:border rounded-lg dark:bg-gray-975">
              <header
                className={clsx(
                  'p-4 md:p-6 mb-6 -mt-4 -mx-4 md:-mt-6 md:-mx-6',
                  'text-center bg-gray-100 dark:bg-gray-900',
                  'border-b border-gray-300 dark:border-gray-900'
                )}
              >
                <div className="flex flex-col md:flex-row items-center md:justify-between">
                  <TagList tags={tags} />
                  <div className="text-xs text-gray-700 dark:text-gray-600">
                    <PublishedAt date={publishedAt} />
                    <UpdatedAt updatedAt={updatedAt} className="ml-2" />
                  </div>
                </div>
                <CategoryLabel type="tip" withLabel className="mt-12 mb-6 block" />
                <h1 className="text-5xl font-black leading-tight mb-12">{title}</h1>
              </header>
              <div>
                <h1 className="hidden">{title}</h1>
                <Markdown content={content} contentType="tip" />
              </div>
            </Card>
            <ContentFooterNav prev={prev} next={next} />
          </article>
        </Container>
      </Layout>
    </>
  )
}

export default TipsPage
