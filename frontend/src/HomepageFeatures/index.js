import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'ORM Graph',
    Svg: require('@site/static/img/chain-of-responsibility.svg').default,
    description: (
      <>
        Object relational mapping in an elusive beast that has continually
        escaped taming ... oh, wait a minute. Is that still true?
      </>
    ),
  },
  {
    title: 'TDD culture',
    Svg: require('@site/static/img/test-driven-development.svg').default,
    description: (
      <>
        Does TDD add value to the dev process. Or is it just another time 
        hog and productivity killer? It cannot be both
      </>
    ),
  },
  {
    title: 'Trivia Fun',
    Svg: require('@site/static/img/mind-testing.svg').default,
    description: (
      <>
        It is said that an active always mind stays young forever. Or does it 
        only stay away from trouble? Perhaps both?
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
