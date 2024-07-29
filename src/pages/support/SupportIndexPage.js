import BasicWidthLimitLayout from "../../layouts/BasicWidthLimitLayout";

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Flex,
  } from '@chakra-ui/react'

const SupportIndexPage = () => {

    return (

        <BasicWidthLimitLayout>

            <h1 className="m-10 text-5xl">고객센터</h1>

            <h3 className="p-3 text-xl font-bold">자주 하는 질문</h3>
            <Accordion allowToggle>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        홈페이지 - 크리스탈 충전은 어떻게 하나요?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
<p className="py-10">
크리스탈 충전은 로그인 후 로그인 영역 하단의 '크리스탈 충전하기' 버튼과<br/>
홈페이지 우측 상단의 '충전' 버튼을 통해 충전하실 수 있습니다.
</p>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        설치/실행 - 게임을 설치하는데 설치 게이지가 되돌아가서 완료되지 않습니다.
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} >
<p className="py-10">
게임 설치 시 설치 게이지가 되돌아가서 설치가 완료되지 않는 현상은

방화벽 또는 백신 차단 등의 영향으로 발생될 수 있습니다.


사용 중인 방화벽과 백신을 모두 종료한 후에

'관리자 모드'로 게임 설치를 진행해 주시길 바랍니다.


추가로 아래 절차를 확인하시어 제어판&gt; Windows Defender 방화벽&gt;

'Windows Defender 방화벽을 통해 앱 또는 기능 허용'을 통해

파이널판타지14가 설치된 경로 내 위치한 Boot 폴더의

FFXIV_Boot.exe / FFXIV_Launcher.exe 파일 2종에 대한 추가를 완료해 주세요.


또한, 파이널판타지14 클라이언트 용량이 크기 때문에

가급적 유선 랜(LAN)으로 설치 진행을 권장드립니다.


위 절차를 진행하신 뒤,

런처 좌측 상단의 'Direct X 11 MODE'를 'OFF'로 설정한 상태에서

런처를 재실행하여 게임 설치를 진행해 주시길 바랍니다.


Direct X 11 MODE, 방화벽과 백신을 종료한 상태로 진행하였음에도 동일한 현상이 지속된다면

문의하기를 통해 1:1 문의를 접수해주시길 바랍니다.
</p>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        비매너 - 비매너 신고는 어떻게 접수하나요?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
<p className="py-10">
신고하기 방법

◆고객센터 &gt; 빠른 문의 &gt; 비매너 신고 선택

◆문의분류 선택 후 관련 정보를 상세히 기입하여 등록해 주시기 바랍니다.



※ 비매너 신고 접수의 경우 사고 발생일로부터 7일 이내 신고된 문의에 대해서만 처리가 가능합니다.

※ 사건이 발생한 서버와 신고 대상자의 캐릭터명을 적어주시면 원활한 조사에 도움이 됩니다.
</p>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        설치/실행 - [런처 오류] 런처 업데이트 게이지가 계속해서 0%로 되돌아가 실행이 불가한 현상
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
<p className="py-10">
런처 실행 시 위와 같은 메시지가 노출되며 이용이 어려우신가요?



해당 문제는 일시적인 네트워크 불안정에 따라 발생 될 수 있는 문제로,

일정 시간 이후 다시 한 번 재시도를 부탁 드리겠습니다.



더불어 바이러스 또는 멀웨어 등에 의한 런처 파일의 손상이 발생하여

정상적으로 구동이 어려울 수 있으므로, 바이러스 검사 후 진행 부탁 드립니다.
</p>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        설치/실행 - 다른 PC에서 이용할 때마다 설정이 초기화됩니다.
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
<p className="py-10">
기존의 PC에서 이용하시던 게임의 설정을 다른 PC 환경에서 동일하게 이용하시려는 경우,
두 가지의 데이터 백업 방법이 존재합니다.


1) UI 백업툴을 통해 파일로 저장/복원
- 런처를 실행하신 후, 설정&gt;백업을 누르시면 UI 백업툴이 실행됩니다.
- UI 백업툴의 백업 버튼을 이용하시면 원하시는 경로에 .fea 파일 형태로 설정이 저장됩니다.
- 해당 파일을 USB와 같은 별도 저장장치에 저장하신 후, 새로운 PC에서 복원 버튼을 통해
설정을 불러옵니다.


2) 설정 데이터 서버 백업 기능 활용
- 게임을 실행하신 후, 캐릭터 선택창에서 ‘설정 데이터 서버 백업 기능’의 활용이 가능합니다.
- 해당 기능은 V4.4 업데이트를 통해 추가되었으며, UI 백업툴에서는 저장이 불가했던
화면설정, 소리설정 등의 클라이언트 데이터 역시 저장/복원이 가능합니다.


[설정 데이터 서버 백업 기능 알아보기!]
</p>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        기타 - [액토즈소프트] - 비회원 문의에 대한 답변은 어디서 받을 수 있나요?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    
<p className="py-10">
비회원 문의 시 개인정보 수집, 이용에 대한 동의 절차를 진행하게 되며,

이 때 기재해 주신 이메일 주소로 답변이 안내됩니다.



비회원 문의를 진행하실 당시 연락처의 SMS 수신 체크를 설정하신 경우,

답변 완료 시 그에 대한 문자 메시지가 전송됩니다.



상세 문의 답변은 개인정보 수집, 이용 동의 시 기재하셨던 메일함에서 확인해 주시기 바랍니다.



※ 메일함의 스팸 설정이 되어 있는 경우, 메일이 수신되지 않을 수 있습니다.

문의 전 스팸/정크 메일 설정을 확인해 주시기 바랍니다.
</p>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        설치/실행 - [런처 오류] 런처 웹서버와의 연결에 실패하여 프로그램을 종료합니다 오류가 발생합니다.
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
<p className="py-10">
해당 오류 발생시 다음과 같은 내용을 확인해보시기 바랍니다.



◆ 백신 프로그램의 실시간 감시로 인한 업데이트 실패

◆ 무선 인터넷(Wi-fi, 핫스팟 등)을 이용하여 플레이하는 경우

◆ 네트워크와 연관된 프로그램을 사용중일 경우 (토렌트, 웹하드, VPN, 패스트핑 등)

◆ 사용하는 인터넷 환경이 공공기관, 학원, 도서관, 기숙사 등의 제한된 인터넷 연결 상태일 때
</p>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        설치/실행 - 예기치 못한 오류로 인해 '파이널 판타지 14'가 종료되었습니다.
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
<p className="py-10">
클라이언트 오류의 경우 모험가님들의 PC 환경에 따라 

다양한 원인으로 발생할 수 있습니다.



아래 전달드리는 내용을 확인하시어 모험가님의 PC를 

전반적으로 점검해보시기 바랍니다.



◆ Windows 업데이트 최신화

Windows는 보안 업데이트, 호환성 업데이트 등이 주기적으로 진행되며

각 프로그램의 정상 작동을 위해 업데이트가 필요합니다.

아울러 불법 개조된 Windows를 이용시 문제가 발생할 수 있으니 

정품 Windows를 통해 게임을 이용해주시기 바랍니다.



◆ 장치 드라이버 업데이트

그래픽카드, 메인보드 등 PC 주요 장치 드라이버가 구버전일 경우 문제가 발생할 수 있습니다.

제조사에서 제공하는 최신 드라이버로 업데이트를 진행하시길 권해드립니다.



◆ 게임 프로그램/레지스트리의 손상 및 변조 가능성

프로그램 제거(앱 제거)를 통해 파이널판타지14를 완전히 삭제하신 후 재설치 해보시기 바랍니다.
</p>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        설치/실행 - 다이렉트X 에서 심각한 오류가 발생하였습니다. 오류 메시지가 발생하며 게임이 종료됩니다.
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
<p className="py-10">
해당 오류의 경우 PC 장치 및 소프트웨어 및 다이렉트X 사이에서 발생하는 오류이며,

사용하시는 PC 의 전반적인 점검이 필요합니다.

아래 안내드리는 사항을 확인하시어 조치를 취해보시기 바랍니다.



◆ 다이렉트X 최신 버전 업데이트

다이렉트X 프로그램이 최신 버전이 아닐 경우 문제가 발생할 수 있으며,

최신 버전으로 업데이트를 진행해보시기 바랍니다.

(Windows 업데이트 시, 자동으로 다이렉트X 업데이트가 진행됩니다.)



◆다이렉트X 복원

다이렉트X 프로그램이 손상되거나, 불법 개조된 Windows OS를 사용하실 경우 

문제가 발생할 수 있으며, 이러한 경우 다이렉트X 프로그램의 복원이 필요합니다.

MicroSoft사가 지원하는 다이렉트X 복원 프로그램을 이용해보시기 바라며,

경우에 따라 Windows OS의 재설치가 필요할 수 있습니다.



◆ Windows 업데이트 최신화

Windows는 보안 업데이트, 호환성 업데이트 등이 주기적으로 진행되며

각 프로그램의 정상 작동을 위해 업데이트가 필요합니다.

Windows 업데이트를 통해 다이렉트X의 최신 버전 설치가 가능하며

이를 통해 문제가 해결될 수 있습니다. 



◆ 장치 드라이버 업데이트

그래픽카드, 메인보드 등 PC 주요 장치 드라이버가 구버전일 경우 문제가 발생할 수 있습니다.

제조사에서 제공하는 최신 드라이버로 업데이트를 진행하시길 권해드립니다.



◆ 게임 프로그램/레지스트리의 손상 및 변조 가능성

프로그램 제거(앱 제거)를 통해 파이널판타지14를 완전히 삭제하신 후 재설치 해보시기 바랍니다.
</p>
                    </AccordionPanel>
                </AccordionItem>





            </Accordion>
        
        </BasicWidthLimitLayout>
    );
}

export default SupportIndexPage;