const ProductListPage = () => {

  return (

    <section>
      <h1 className="text-5xl p-10">상점페이지</h1>

      <div className="flex flex-col justify-center items-center">
        <table id="article-list" className="w-11/12 min-w-[860px] mt-5 text-center text-xl">
          <thead className="bg-zinc-200 text-gray-900 leading-[60px]">
            <tr>
              <th className="rounded-l-md">
                No
              </th>

              <th className="w-4/5">
                상품
              </th>
              <th>
                가격
              </th>
            </tr>
          </thead>

          <tbody className="text-zinc-600">
            <tr>
              <td>
                <div className="mt-3">
                  1
                </div>
              </td>
              <td>
                <div className="flex mt-3 border-r">
                  <img src="/images/chi1.jpg" className="w-60 border"></img>
                  <div className="flex flex-col flex-grow justify-center text-left ml-8">
                    <div className="mt-5 text-4xl">개비싼인형</div>
                    <p className="mt-4">이건너무비쌉니다근데너무귀엽습니다<br /> 짱귀엽습니다</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="mt-3">
                  5만원
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </section>
  );
}

export default ProductListPage;