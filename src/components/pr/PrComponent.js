import React, { useEffect } from 'react';
import styles from '../../css/prComponent.module.css';

const PrComponent = () => {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.primageAnimation);
                }
            });
        });

        const primages = document.querySelectorAll(`.${styles.primage}`);
        primages.forEach((primage) => observer.observe(primage));

        return () => {
            primages.forEach((primage) => observer.unobserve(primage));
        };
    }, []);

    return (
        <div className={styles.prComponent}>
      <section className={styles.section}>
        <div className='w-[1350px] m-auto'>
            <img className={`${styles.primage} w-[50rem]`} src='/images/pr_mario.png' />
            <h3>슈퍼마리오 브라더스</h3>
            <p>
    《슈퍼 마리오브라더스》[a]는 닌텐도가 개발하고 배급한 패밀리 컴퓨터용 플랫폼 게임이다. 1983년 아케이드용으로 출시된 《마리오브라더스》의 후속작이자 이후 탄생한 《슈퍼 마리오》 시리즈의 첫 번째 작품이다. 1985년 9월 13일 일본에서 처음 발매됐으며 북미 지역에선 1985년 10월 혹은 11월 중에 출시됐다. 1986년에 전세계 보급 아케이드 시스템 닌텐도 VS. 시스템으로 이식됐으며 1987년에 유럽 지역에 출시됐다.

    플레이어는 주인공 마리오, 혹은 2인용으로 시작할 시 루이지를 조종하며 악당 쿠파가 이끄는 군단이 점령한 버섯 왕국을 모험해 피치 공주를 구출하는 것이 게임의 주목표이다. 게임 내 진행은 횡스크롤 형태의 스테이지 내에서 위험요소와 적들을 제거하거나 돌파하는 형식으로 이뤄지며, 때때로 마리오를 크게 하는 슈퍼버섯, 불꽃을 발사하게 하는 파이어플라워, 일시적으로 플레이어를 무적으로 만드는 스타같은 파워업을 획득해 이용할 수 있다.

    《슈퍼 마리오브라더스》는 미야모토 시게루와 데즈카 다카시가 공동으로 기획하고 개발한 작품으로, 그들이 패밀리 컴퓨터 출시 후 《데빌 월드》, 《익사이트바이크》와 《스파르탄 X》같이 3년간 참여한 게임들에서 얻은 경험에서 착안해 제작한 게임이다. 닌텐도가 이전에 발매한 《동키콩》과 《마리오브라더스》의 '플랫폼 운동 게임' 규칙을 개량하여 《슈퍼 마리오브라더스》에 접목해, 플랫폼 게임플레이의 튜토리얼 역할을 하는 첫 번째 스테이지 월드 1-1같은 요소들을 도입했다.

    《슈퍼 마리오브라더스》은 발매 당시 정확한 조종감과 단순하면서도 능숙한 기술을 필요로 하는 깊은 게임플레이로 전폭적인 인기를 끌었다. 원작 패밀리 컴퓨터판은 전세계 판매량이 4024만 장을 기록해 상업적인 대성공을 거뒀다. 패밀리 컴퓨터와 함께 1983년 북미 콘솔 비디오 게임 시장의 위기 이후 비디오 게임 산업에 재활력을 불어넣은 중요 요인으로 꼽힌다. 마리오와 《슈퍼 마리오브라더스》는 대중문화의 선두주자가 됐다.
            </p>
        </div>
      </section>
      <section className={styles.section}>
        <div className='w-[1350px] m-auto'>
            <img className={`${styles.primage} w-[50rem]`} src='/images/pr_kirby.png' />
            <h3>별의 요정 커비</h3>
            <p>
            </p>
        </div>
      </section>
      <section className={styles.section}>
        <div className='w-[1350px] m-auto'>
            <img className={`${styles.primage} w-[50rem]`} src='/images/pr_zelda.png' />
            <h3>젤다의 전설</h3>
        </div>
      </section>
      <section className={styles.section}>
        <div className='w-[1350px] m-auto'>
            <img className={`${styles.primage} w-[50rem]`} src='/images/pr_pokemon.png' />
            <h3>포켓몬스터</h3>
        </div>
      </section>
      <section className={styles.section}>
        <div className='w-[1350px] m-auto'>
            <img className={`${styles.primage} w-[50rem]`} src='/images/pr_animal.png' />
            <h3>동물의 숲</h3>
        </div>
      </section>
    </div>
  );
};

export default PrComponent;