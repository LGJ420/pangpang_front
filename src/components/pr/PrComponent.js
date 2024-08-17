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
        <div className='w-[1350px] m-auto flex items-center'>
          <div className='w-1/2'>
            <img className={`${styles.primage} w-[50rem] h-[35rem] object-cover rounded-2xl`} src='/images/pr_mario.png' />
          </div>
          <div className='w-1/2 p-3'>
            <h3 className='text-5xl font-semibold font-poor-story p-7'>
              슈퍼마리오 브라더스
            </h3>
            <p className='px-7'>
              《슈퍼 마리오브라더스》는 닌텐도가 개발하고 배급한 패밀리 컴퓨터용 플랫폼 게임이다. 1983년 아케이드용으로 출시된 《마리오브라더스》의 후속작이자 이후 탄생한 《슈퍼 마리오》 시리즈의 첫 번째 작품이다. 1985년 9월 13일 일본에서 처음 발매됐으며 북미 지역에선 1985년 10월 혹은 11월 중에 출시됐다. 1986년에 전세계 보급 아케이드 시스템 닌텐도 VS. 시스템으로 이식됐으며 1987년에 유럽 지역에 출시됐다.

              플레이어는 주인공 마리오, 혹은 2인용으로 시작할 시 루이지를 조종하며 악당 쿠파가 이끄는 군단이 점령한 버섯 왕국을 모험해 피치 공주를 구출하는 것이 게임의 주목표이다. 게임 내 진행은 횡스크롤 형태의 스테이지 내에서 위험요소와 적들을 제거하거나 돌파하는 형식으로 이뤄지며, 때때로 마리오를 크게 하는 슈퍼버섯, 불꽃을 발사하게 하는 파이어플라워, 일시적으로 플레이어를 무적으로 만드는 스타같은 파워업을 획득해 이용할 수 있다.

              《슈퍼 마리오브라더스》는 미야모토 시게루와 데즈카 다카시가 공동으로 기획하고 개발한 작품으로, 그들이 패밀리 컴퓨터 출시 후 《데빌 월드》, 《익사이트바이크》와 《스파르탄 X》같이 3년간 참여한 게임들에서 얻은 경험에서 착안해 제작한 게임이다. 닌텐도가 이전에 발매한 《동키콩》과 《마리오브라더스》의 '플랫폼 운동 게임' 규칙을 개량하여 《슈퍼 마리오브라더스》에 접목해, 플랫폼 게임플레이의 튜토리얼 역할을 하는 첫 번째 스테이지 월드 1-1같은 요소들을 도입했다.

              《슈퍼 마리오브라더스》은 발매 당시 정확한 조종감과 단순하면서도 능숙한 기술을 필요로 하는 깊은 게임플레이로 전폭적인 인기를 끌었다. 원작 패밀리 컴퓨터판은 전세계 판매량이 4024만 장을 기록해 상업적인 대성공을 거뒀다. 패밀리 컴퓨터와 함께 1983년 북미 콘솔 비디오 게임 시장의 위기 이후 비디오 게임 산업에 재활력을 불어넣은 중요 요인으로 꼽힌다. 마리오와 《슈퍼 마리오브라더스》는 대중문화의 선두주자가 됐다.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className='w-[1350px] m-auto flex items-center'>
          <div className='w-1/2'>
            <img className={`${styles.primage} w-[50rem] h-[35rem] object-cover rounded-2xl`} src='/images/pr_kirby.png' />
          </div>
          <div className='w-1/2 p-3'>
            <h3 className='text-5xl font-semibold font-poor-story p-7'>
              별의 커비
            </h3>
            <p className='px-7'>
              《별의 커비》는 HAL 연구소가 개발하고 닌텐도가 배급하는 액션 플랫폼 비디오 게임 시리즈이다. 분홍색 동그라미 모양의 주인공 커비가 자신이 사는 혹성 팝스타를 위협하는 악당들을 물리치는 모험을 다룬다. 시리즈 대부분 게임들은 퍼즐 풀기와 진행형 격투 게임 요소가 담긴 횡스크롤 플랫포머이다. 커비는 적을 입으로 빨아들여 발사체로 내뱉거나 먹을 수 있는 능력이 있는데, 특정 적을 먹으면 그 적이 가진 특성에 맞는 능력이나 무기를 획득해 사용할 수 있는 것이 특징이다. 시리즈 대부분이 액션 게임에 익숙치 않은 사람들을 위해 쉽게 설계돼있으며, 숙력된 플레이어도 위한 도전적인 목표를 마련한다.

              《별의 커비》 시리즈는 총 30종 이상의 게임들로 구성돼 전세계 4천만 장 이상의 판매량을 기록해, 닌텐도의 최다 판매량 프랜차이즈 순위권 및 최다 판매량 비디오 게임 프랜차이즈 50위권 안에 진입하고 있다.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className='w-[1350px] m-auto flex items-center'>
          <div className='w-1/2'>
            <img className={`${styles.primage} w-[50rem] h-[35rem] object-cover rounded-2xl`} src='/images/pr_zelda.png' />
          </div>
          <div className='w-1/2 p-3'>
            <h3 className='text-5xl font-semibold font-poor-story p-7'>
              젤다의 전설
            </h3>
            <p className='px-7'>
              《젤다의 전설》은 일본의 비디오 게임 개발자들 미야모토 시게루와 테즈카 타카시가 기획한 액션 어드벤처 게임 시리즈이다. 닌텐도가 대부분의 게임들을 전담해 개발하고 배급했으나 일부 작품의 경우 캡콤, 그레조, 코에이 테크모같은 기업들이 개발했다. 액션 롤플레잉 게임과 액션 어드벤처를 결합한 고유의 게임플레이가 특징이다.

              《젤다의 전설》 시리즈에서는 엘프 모습을 한 하일리안 청년 링크와 하일리아 여신의 환생 젤다가 두 주인공으로서 등장하며, 게임의 무대가 되는 하이랄 왕국을 위협하는 마왕 가논돌프를 물리쳐 세계를 구하는 것이 주된 이야기이다. 가논돌프는 하이랄의 세 여신이 남긴 성스러운 유물 트라이포스를 사용해 세계를 자신이 원하는 어둠의 모습으로 만들고자 하는 목적을 가진 악당이다. 트라이포스는 각각 용기, 지혜와 힘을 상징하는 삼각형 모양의 세 유물로 구성됐다. 각 작품에서의 링크와 젤다는 직속 후속작이 아닌 이상 모습만 유사한 서로다른 인물들이나, 링크는 왼손잡이이며 녹색옷을 입는 등의 시리즈에 걸친 공통점이 존재한다.

              2010년 4월을 기준으로, 젤다의 전설 시리즈는 첫번째 게임인 《젤다의 전설》 출시 이후 5천 9백만장을 팔았으며[1], 첫 작은 NES 소프트웨어 중 4번째로 가장 많이 팔린 것으로 기록되었다.[2] 평가가 매우 좋기로 유명하며 이 시리즈는 15개의 닌텐도 하드웨어 기반의 공식 소프트웨어가 있으며, 여러 가지 외전도 존재하고 있다. 북미 지역에서는 1989년에 해당 게임을 바탕으로 한 애니메이션을 방영, 제작하였으며, 일본에서는 여러 만화책도 제작되었다. 이 시리즈의 최신작은 닌텐도 Wii U, 스위치 기반으로 젤다의 전설 브레스 오브 더 와일드가 2017년 3월 3일(일본 기준)에 출시되었다.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className='w-[1350px] m-auto flex items-center'>
          <div className='w-1/2'>
            <img className={`${styles.primage} w-[50rem] h-[35rem] object-cover rounded-2xl`} src='/images/pr_pokemon.png' />
          </div>
          <div className='w-1/2 p-3'>
            <h3 className='text-5xl font-semibold font-poor-story p-7'>
              포켓몬스터
            </h3>
            <p className='px-7'>
              《포켓몬스터》(일본어: ポケットモンスター, 영어: Pocket Monsters), 약칭 포켓몬(ポケモン, 영어: Pokémon)은 닌텐도, 게임 프리크와 크리처스가 공동설립한 일본 기업 포켓몬 컴퍼니가 관리하는 미디어 프랜차이즈이다. 1995년 타지리 사토시가 창작한 가공의 생물 '포켓몬'에서 탄생한 프랜차이즈로, 포켓몬과 공존하는 인간들은 '포켓몬 트레이너'로서 포켓몬을 육성해 스포츠와 같은 배틀을 하는 가상의 세계를 무대로 한다.

              《포켓몬스터》는 1996년 2월, 게임 프리크가 개발해 닌텐도의 휴대용 게임기 게임보이,게임보이 컬러로 출시된 한 쌍의 게임군 《포켓몬스터 레드·그린》으로 시작해 이후 각종 매체를 아우르는 미디어 믹스 프랜차이즈로 확장했다. 《포켓몬스터》는 역사상 최고의 수익을 기록한 미디어 프랜차이즈이고, 포켓몬 비디오 게임 시리즈의 경우 총 판매량 3억 8천만 장 이상을 기록해 게임 역사상 《마리오》, 《테트리스》, 《콜 오브 듀티》에 이어 네 번째로 가장 큰 비디오 게임 프랜차이즈이며, 포켓몬 애니메이션의 경우 전세계 183개국에 방영돼 1,000개 이상의 에피소드를 넘도록 방영되며 역사상 가장 성공적인 비디오 게임의 애니메이션화 작품이 됐다. 그 외에 《포켓몬스터》 프랜차이즈는 장난감 브랜드, 카드 게임, 실사 영상 매체, 소설, 만화, 음악, 놀이기구 등 다양한 상품권에 걸쳐 전개되고 있다.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className='w-[1350px] m-auto flex items-center'>
          <div className='w-1/2'>
            <img className={`${styles.primage} w-[50rem] h-[35rem] object-cover rounded-2xl`} src='/images/pr_animal.png' />
          </div>
          <div className='w-1/2 p-3'>
            <h3 className='text-5xl font-semibold font-poor-story p-7'>
              동물의 숲
            </h3>
            <p className='px-7'>
              《동물의 숲》(일본어: どうぶつの森 도오부츠노 모리, 영어: Animal Crossing)은 닌텐도의 비디오 게임이다. 또한 동물의 숲은 플레이어가 동물들이 살고 있는 숲 속의 마을로 이사를 가서 살면서 산책을 하고, 집을 인테리어하고, 곤충 채집을 하고, 낚시를 하고, 동물 이웃들과 교류하는 등의 활동을 하는 온라인 연결을 하여 친구와 즐길 수 있는 커뮤니케이션 게임이다.

              《동물의 숲》 시리즈의 가장 큰 특징은 엔딩이 없다는 것이다. 자유도가 높아 게임이 제공하는 범위 내에서 하고 싶은 일은 거의 무엇이든지 할 수 있지만, 그 결과는 주인공이 직접적 또는 간접적으로 받게 된다. 한 예시로, 마을에 심어진 꽃을 전부 뽑고 나무를 모두 잘라 버리면, 마을 환경 지수가 낮아지며, 이웃들은 자주 이사를 가고 이사를 간 이웃은 다른 마을의 주인공에게 그 마을의 이야기를 하기도 한다. 또한 게임 내에는 다른 닌텐도 게임과 관련된 물품들이 등장하여, 직접 캐릭터가 착용하거나 게임기로 다른 미니 게임을 할 수도 있다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PrComponent;