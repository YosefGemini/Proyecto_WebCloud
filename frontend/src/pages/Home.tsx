import FlipCard from "../components/flip_card/FlipCard";
import NewsCarrusel from "../components/news_carrousel/NewsCarrusel";
import { news } from "../functions/ConstInfo";
import NavigationLayout from "./NavigationLayout";
import ninstendo from "../assets/nintendoSwitch.png";
import caseCPU from "../assets/Case.png";
import laptop from "../assets/laptop.png";

export default function Home() {
  return (
    <NavigationLayout selectedPage={0}>
      <div className="mt-[70px]">
        <section id="sectionNews">
          <NewsCarrusel news={news} />
        </section>

        <section
          id="sectionInfo"
          className="flex flex-col items-center justify-center w-full mt-10 "
        >
          <div className="w-[80%] bg-white rounded-t-md p-8">
            <div className="w-full text-start">
              <h1 className=" py-10 text-4xl font-bold text-fourth_blue font-mono">
                los Mejores productos para tu Setup
              </h1>
            </div>

            <div className="border-2 border-fourth_blue w-[95%]"></div>
            <p className="font-normal font-mono text-primary_blue m-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              laboriosam. Ipsa modi dicta eius eos, autem voluptatem doloremque!
              Quis aliquam atque tempore itaque aut quo distinctio error at
              voluptas dolorum blanditiis placeat rem illum vitae cupiditate
              labore, cum voluptates quidem delectus veritatis tenetur rerum
              excepturi facere ad. Cum optio odit nobis ullam aut expedita velit
              officia, reprehenderit nemo omnis fugiat dolorem nesciunt
              voluptate? Veritatis, iusto corrupti pariatur sed officia amet
              illo consequuntur, vero totam quas architecto quia! Quam
              blanditiis impedit non illum voluptatem, quos delectus consectetur
              perspiciatis tempora, nisi distinctio! Repellendus autem
              voluptates vel deserunt optio, dolor molestias sapiente ullam,
              exercitationem quidem harum et amet. Eligendi, perspiciatis a?
              Dignissimos nostrum reiciendis aliquam exercitationem aperiam nemo
              tempore dolorum minima, illo ex necessitatibus iure mollitia
              eveniet laboriosam recusandae sapiente delectus quod maiores at
              numquam ipsum rerum accusamus? Quis facere repellendus quia
              reprehenderit vitae, ex incidunt libero rem modi accusamus
              officiis labore maiores. Provident repudiandae iusto corporis
              nulla facere officiis laudantium dolorem recusandae qui, tenetur
              cum incidunt repellendus veniam? Quibusdam, quas. Eos, quibusdam
              ad adipisci voluptas sapiente aperiam tempore error voluptatum a
              eius maxime eum saepe, exercitationem odit ipsam nisi quis
              temporibus qui vitae necessitatibus. Ad debitis deserunt
              consequatur mollitia vero, quasi quod, harum ex doloribus
              dignissimos earum, commodi ratione reprehenderit? Exercitationem
              vel ut totam fugiat illo impedit officia, amet temporibus
              distinctio aliquid quaerat ipsam nemo a ratione eligendi quos
              voluptatibus eius assumenda nesciunt neque doloremque corrupti?
              Optio iusto voluptate sapiente cumque expedita ea modi dolorem non
              distinctio sunt eligendi nihil enim dicta sit, asperiores
              recusandae nemo, labore porro fugiat molestias obcaecati a nisi
              repellendus pariatur! Tenetur deleniti, incidunt velit accusamus
              nostrum nobis iusto. Atque officia rem minus eum! Quisquam ipsum
              aut perspiciatis voluptatibus eum explicabo magnam quos itaque,
              soluta est praesentium facere natus quaerat rem consectetur nobis
              maxime mollitia sapiente incidunt inventore!
            </p>
          </div>
        </section>

        <section
          id="sectionCards"
          className="flex flex-col items-center justify-center w-full  mb-10"
        >
          <div className="flex flex-col w-[80%] bg-white p-8 rounded-b-lg">
            <div className="w-full text-start">
              <h1 className=" py-10 text-4xl font-bold text-fourth_blue font-mono">
                Descubre
              </h1>
            </div>
            <div className="border-2 border-fourth_blue w-[95%]"></div>

            <div className="flex flex-wrap p-8 justify-center">
              <FlipCard
                title="titulo 1"
                description="asdasdqasdakddasklkmaskldasklads"
                imageURL={ninstendo}
                link=""
                style="bg-[#d19019]"
              />
              <FlipCard
                title="titulo 2"
                description="asdasdqasdakddasklkmaskldasklads"
                imageURL={caseCPU}
                link=""
                style="bg-[#ea3a6c]"
              />
              <FlipCard
                title="titulo 3"
                description="asdasdqasdakddasklkmaskldasklads"
                imageURL={laptop}
                link=""
                style="bg-[#407bfe]"
              />
            </div>
          </div>
        </section>
        <footer className="w-full h-[400px] bg-fourth_blue text-white">


        </footer>
      </div>
    </NavigationLayout>
  );
}
