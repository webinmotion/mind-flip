import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from "@docusaurus/Link";

const FeatureList = [
  {
    title: 'SPA - State Management',
    Svg: require('@site/static/img/memory-card-sd.svg').default,
    description: (
      <>
        Single page apps and memory management. What are your options?
          How do you get started?
      </>
    ),
      link: "/docs/category/spa---state-management"
  },
  {
    title: 'TDD culture',
    Svg: require('@site/static/img/test-driven-development.svg').default,
    description: (
      <>
        Does TDD add value to the dev process. Or is it just another time 
        hog and productivity killer? It can only be one of them
      </>
    ),
      link: "/docs/category/tdd---culture--practise"
  },
  {
    title: 'Express - NodeJS',
    Svg: require('@site/static/img/node-js-express.svg').default,
    description: (
      <>
        It is said that an active always mind stays young forever. Or does it 
        only stay away from trouble? Perhaps both?
      </>
    ),
      link: "/docs/category/express---up-and-running"
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
          <Link to={link}>
            <Svg className={styles.featureSvg} role="img" />
          </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
