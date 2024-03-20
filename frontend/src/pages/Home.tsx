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
        <footer className="w-full h-[250px] bg-slate-200 text-fourth_blue flex justify-center items-center">
          <div className="border-t border-slate-900/5 py-10">
            <svg
              className="mx-auto h-5 w-auto text-slate-900"
              aria-hidden="true"
              viewBox="0 0 160 24"
              fill="none"
            >
              <path
                d="M18.724 1.714c-4.538 0-7.376 2.286-8.51 6.857 1.702-2.285 3.687-3.143 5.957-2.57 1.296.325 2.22 1.271 3.245 2.318 1.668 1.706 3.6 3.681 7.819 3.681 4.539 0 7.376-2.286 8.51-6.857-1.701 2.286-3.687 3.143-5.957 2.571-1.294-.325-2.22-1.272-3.245-2.32-1.668-1.705-3.6-3.68-7.819-3.68zM10.214 12c-4.539 0-7.376 2.286-8.51 6.857 1.701-2.286 3.687-3.143 5.957-2.571 1.294.325 2.22 1.272 3.245 2.32 1.668 1.705 3.6 3.68 7.818 3.68 4.54 0 7.377-2.286 8.511-6.857-1.702 2.286-3.688 3.143-5.957 2.571-1.295-.326-2.22-1.272-3.245-2.32-1.669-1.705-3.6-3.68-7.82-3.68z"
                className="fill-sky-400"
              ></path>
              <path
                d="M51.285 9.531V6.857h-3.166v-3.6l-2.758.823v2.777h-2.348v2.674h2.348v6.172c0 3.343 1.686 4.526 5.924 4.011V17.22c-2.094.103-3.166.129-3.166-1.517V9.53h3.166zm12.087-2.674v1.826c-.97-1.337-2.476-2.16-4.468-2.16-3.472 0-6.357 2.931-6.357 6.763 0 3.805 2.885 6.763 6.357 6.763 1.992 0 3.498-.823 4.468-2.186v1.851h2.758V6.857h-2.758zM59.338 17.4c-2.297 0-4.034-1.723-4.034-4.114 0-2.392 1.736-4.115 4.034-4.115s4.034 1.723 4.034 4.115c0 2.391-1.736 4.114-4.034 4.114zM70.723 4.929c.97 0 1.762-.823 1.762-1.775 0-.977-.792-1.774-1.762-1.774s-1.762.797-1.762 1.774c0 .952.792 1.775 1.762 1.775zm-1.379 14.785h2.758V6.857h-2.758v12.857zm5.96 0h2.757V.943h-2.758v18.771zM95.969 6.857l-2.502 8.872-2.655-8.872h-2.63L85.5 15.73l-2.477-8.872h-2.91l4.008 12.857h2.707l2.68-8.665 2.656 8.665h2.706L98.88 6.857h-2.911zm6.32-1.928c.97 0 1.762-.823 1.762-1.775 0-.977-.792-1.774-1.762-1.774s-1.762.797-1.762 1.774c0 .952.792 1.775 1.762 1.775zm-1.379 14.785h2.758V6.857h-2.758v12.857zm12.674-13.191c-1.736 0-3.115.643-3.957 1.98V6.857h-2.758v12.857h2.758v-6.891c0-2.623 1.43-3.703 3.242-3.703 1.737 0 2.86 1.029 2.86 2.983v7.611h2.757V11.82c0-3.343-2.042-5.297-4.902-5.297zm17.982-4.809v6.969c-.971-1.337-2.477-2.16-4.468-2.16-3.473 0-6.358 2.931-6.358 6.763 0 3.805 2.885 6.763 6.358 6.763 1.991 0 3.497-.823 4.468-2.186v1.851h2.757v-18h-2.757zM127.532 17.4c-2.298 0-4.034-1.723-4.034-4.114 0-2.392 1.736-4.115 4.034-4.115 2.297 0 4.034 1.723 4.034 4.115 0 2.391-1.737 4.114-4.034 4.114z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M145.532 3.429h8.511c.902 0 1.768.36 2.407 1.004.638.643.997 1.515.997 2.424v8.572c0 .909-.359 1.781-.997 2.424a3.394 3.394 0 01-2.407 1.004h-8.511a3.39 3.39 0 01-2.407-1.004 3.438 3.438 0 01-.997-2.424V6.857c0-.91.358-1.781.997-2.424a3.39 3.39 0 012.407-1.004zm-5.106 3.428c0-1.364.538-2.672 1.495-3.636a5.09 5.09 0 013.611-1.507h8.511c1.354 0 2.653.542 3.61 1.507a5.16 5.16 0 011.496 3.636v8.572a5.16 5.16 0 01-1.496 3.636 5.086 5.086 0 01-3.61 1.506h-8.511a5.09 5.09 0 01-3.611-1.506 5.164 5.164 0 01-1.495-3.636V6.857zm10.907 6.251c0 1.812-1.359 2.916-3.193 2.916-1.823 0-3.182-1.104-3.182-2.916v-5.65h1.633v5.52c0 .815.429 1.427 1.549 1.427 1.12 0 1.549-.612 1.549-1.428v-5.52h1.644v5.652zm1.72 2.748V7.457h1.644v8.4h-1.644z"
                fill="currentColor"
              ></path>
            </svg>
            <p className="mt-5 text-center text-sm leading-6 text-slate-500">
              © 2024 Tailwind Labs Inc. All rights reserved.
            </p>
            <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
              <a href="/privacy-policy">Privacy policy</a>
              <div className="h-4 w-px bg-slate-500/20"></div>
              <a href="/changelog">Changelog</a>
            </div>
          </div>
        </footer>
      </div>
    </NavigationLayout>
  );
}
