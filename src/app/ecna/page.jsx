import Layout from "@/components/Layout";
import Image from "next/image";
import image from '../../../public/image/landing/National_1.jpg';

export default function Page() {    
    return (
        <Layout>
            <main className="min-h-[100vh] pb-20 flex flex-col ">
                <header className="w-full py-20 bg-[#FF4719]">
                    <h1 className="font-bold text-center md:text-6xl sm:text-5xl text-4xl text-white">Ethiopia Community Nutrition Activity (ECNA)</h1>
                </header>
                <main className="flex flex-col gap-20">
                    <section className="flex flex-col gap-10">
                        <header className="w-full md:p-20 p-10 flex flex-col gap-5 text-center bg-[#F9F9F9] ">
                            <h1 className="font-semibold md:text-5xl text-4xl">Intermediate Result I (IR 1)</h1>
                            <p className="md:text-3xl text-2xl">Enhanced individual and community agency and demand for services</p>
                        </header>
                        <section className="flex flex-col gap-20">
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col md:flex-row">
                                <div className="md:w-[50%] flex flex-col gap-6">
                                    <h1 className="text-center text-4xl font-semibold">Knowledge and skills on nutrition improved</h1>
                                    <p className="text-xl">
                                        The enhancement of knowledge and skills on nutrition is a key focus. The program aims to improve the understanding of essential nutrition practices among target groups, including pregnant and lactating women, adolescent girls, and caretakers. By delivering targeted education on topics such as dietary diversity, the importance of iron and folic acid supplementation, and optimal breastfeeding practices, ECNA equips individuals with the necessary knowledge to make informed decisions for themselves and their families. This improvement in knowledge leads to healthier behaviors, better nutrition outcomes, and a greater ability to prevent malnutrition and related health issues within communities.
                                    </p>
                                </div>
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl " />
                            </div>
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col-reverse md:flex-row">
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl " />
                                <div className="md:w-[50%] flex flex-col gap-6">
                                    <h1 className="text-center text-4xl font-semibold">Nutrition and health service seeking behavior improved</h1>
                                    <p className="text-xl">
                                        Improving nutrition and health service-seeking behavior is a crucial component of Intermediate Result 1 in the ECNA initiative. This involves encouraging individuals, particularly women, children, and adolescents, to actively seek out and utilize available nutrition and health services. ECNA aims to break down barriers to accessing services by raising awareness about the benefits of regular health check-ups, supplementation programs, and early treatment of malnutrition and related illnesses. Through community engagement, behavior change campaigns, and the use of trusted local platforms, the program fosters a culture where seeking healthcare becomes normalized and prioritized. By improving service-seeking behavior, ECNA ensures that individuals are more likely to access timely and appropriate care, ultimately leading to better health outcomes and reduced malnutrition.
                                    </p>
                                </div>
                            </div>
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col md:flex-row">
                                <div className="md:w-[50%] flex flex-col gap-6">
                                    <h1 className="text-center text-4xl font-semibold">Increased Community mobilization and utilization of community platform</h1>
                                    <p className="text-xl">
                                        Increased community mobilization and utilization of community platforms is a key strategy under Intermediate Result 1 of the ECNA initiative. ECNA engages communities by empowering local leaders, health workers, and volunteers to become advocates for improved nutrition practices and service utilization. Through the activation of existing community platforms such as health committees, women&apos;s groups, and local governance structures, the program facilitates the dissemination of vital information about nutrition and health services. These platforms serve as hubs for raising awareness, fostering dialogue, and organizing community-driven actions that address local nutrition challenges. By strengthening these platforms and increasing participation, ECNA enhances collective responsibility and ownership over health and nutrition issues, ensuring that the community plays an active role in improving its well-being. This mobilization also helps build trust in services, making them more accessible and effective in addressing the community&apos;s needs.
                                    </p>
                                </div>
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl " />
                            </div>
                        </section>
                    </section>
                    <section className="flex flex-col gap-10">
                        <header className="w-full md:p-20 p-10 flex flex-col gap-5 text-center bg-[#F9F9F9] ">
                            <h1 className="font-semibold md:text-5xl text-4xl">Intermediate Result II (IR 2)</h1>
                            <p className="md:text-3xl text-2xl">Improved access to quality nutrition services at the community level</p>
                        </header>
                        <section className="flex flex-col gap-20">
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col-reverse md:flex-row">
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl " />
                                <div className="md:w-[50%] flex flex-col gap-6">
                                    <h1 className="text-center text-4xl font-semibold">Improved mechanism for production and sustained multi-sectoral coordination at community level.</h1>
                                    <p className="text-xl">
                                        Improving mechanisms for production and sustained multi-sectoral coordination at the community level is essential for ensuring the effective delivery of nutrition services. ECNA works to establish and strengthen local coordination systems that bring together various sectors such as agriculture, health, education, and social services to collaborate on addressing nutrition challenges holistically. By fostering partnerships between these sectors, the program ensures that resources, expertise, and efforts are pooled to improve the availability and quality of nutrition services. This multi-sectoral approach allows for integrated solutions, such as linking food production with nutrition education and healthcare access, addressing the root causes of malnutrition more effectively. Through sustained coordination, communities are better equipped to respond to nutrition needs, particularly during periods of crisis or food insecurity, ensuring that nutrition services are consistently delivered and adapted to local needs.
                                    </p>
                                </div>
                            </div>
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col md:flex-row">
                                <div className="md:w-[50%] flex flex-col gap-6">
                                 <h1 className="text-center text-4xl font-semibold">Frontline workers&apos; capacity on nutrition services improved</h1>
                                    <p className="text-xl">
                                        Frontline workers, including community health workers, nurses, and local volunteers, are critical to delivering nutrition services directly to those in need. ECNA invests in training and continuous professional development to enhance their skills and knowledge in areas such as maternal and child nutrition, dietary counseling, management of malnutrition, and hygiene promotion. By equipping these workers with up-to-date practices and tools, the program ensures that they can provide high-quality, evidence-based nutrition care to their communities. Additionally, improving their capacity enhances their ability to identify malnutrition early, provide appropriate interventions, and offer tailored support to families. This approach leads to better health outcomes, as communities receive more reliable and effective nutrition services delivered by well-trained professionals.
                                    </p>
                                </div>
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl " />
                            </div>
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col-reverse md:flex-row">
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl " />
                                <div className="md:w-[50%] flex flex-col gap-6">
                                    <h1 className="text-center text-4xl font-semibold">Nutrition information system (NIS) and supply chain management strengthened and coordinated</h1>
                                    <p className="text-xl">
                                        Strengthening the Nutrition Information System (NIS) and coordinating supply chain management is a critical component of Intermediate Result 2 in the ECNA initiative. A robust NIS enables timely and accurate data collection on community nutrition status, service delivery, and resource availability, which are vital for making informed decisions and improving nutrition interventions. ECNA works to enhance this system by improving data collection methods, training staff, and integrating nutrition data into broader health information systems. Additionally, coordinating supply chain management ensures that essential nutrition supplies—such as supplements, therapeutic foods, and other materials—are available and delivered efficiently to the community level. By optimizing both the NIS and supply chains, ECNA helps ensure that nutrition services are reliable, responsive, and capable of meeting the needs of vulnerable populations, particularly in times of crisis or supply shortages. This coordination reduces service disruptions and improves the overall effectiveness of community nutrition programs.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </section>
                    <section className="flex flex-col gap-10">
                        <header className="w-full md:p-20 p-10 flex flex-col gap-5 text-center bg-[#F9F9F9] ">
                            <h1 className="font-semibold md:text-5xl text-4xl">Intermediate Result III (IR 3)</h1>
                            <p className="md:text-3xl text-2xl">Improved cross-sector capacity and coordination</p>
                        </header>
                        <section className="flex flex-col gap-20">
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col md:flex-row">
                                <div className="md:w-[50%] flex flex-col gap-6">
                                    <h1 className="text-center text-4xl font-semibold">Increased NGO and private sector provision of nutrition service</h1>
                                    <p className="text-xl">
                                        Recognizing the critical role that non-governmental organizations and private enterprises can play in expanding access to nutrition services, ECNA fosters partnerships with these sectors to enhance service delivery at the community level. By engaging NGOs and private health providers, the initiative leverages their expertise, resources, and reach to complement government efforts in addressing malnutrition. This collaboration helps expand the availability of essential nutrition services, such as health screenings, dietary counseling, and the distribution of nutritional supplements. Additionally, the involvement of the private sector encourages innovation in service delivery models, making nutrition services more accessible, affordable, and sustainable. By promoting a shared responsibility across different sectors, ECNA enhances the overall capacity of communities to address their nutritional needs and improves the long-term resilience of nutrition systems.
                                    </p>
                                </div>
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl " />
                            </div>
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col-reverse md:flex-row">
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl border-4" />
                                <div className="md:w-[50%] flex flex-col gap-6">
                                    <h1 className="text-center text-4xl font-semibold">Improved cross-sector capacity and coordination</h1>
                                    <p className="text-xl">
                                        It focuses on strengthening the mechanisms that ensure continuous collaboration among various sectors involved in community nutrition. This includes enhancing coordination between agricultural production, health services, and local governance to address the nutritional needs of vulnerable groups. By fostering sustained multisectoral coordination, the program aims to create a more integrated approach at the community level, ensuring that efforts in food production, health education, and nutrition interventions are aligned and mutually reinforcing. This approach ensures that the nutritional outcomes are sustainable and resilient to challenges like food insecurity and health.
                                    </p>
                                </div>
                            </div>
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col md:flex-row">
                                <div className="md:w-[50%] flex flex-col gap-6">
                                    <h1 className="text-center text-4xl font-semibold">Key nutrition stakeholders&#39; capacity strengthened.</h1>
                                    <p className="text-xl">
                                        Strengthening the capacity of key nutrition stakeholders is a crucial aspect of Intermediate Result 3 in the ECNA initiative. This involves building the skills, knowledge, and capabilities of government officials, local leaders, NGOs, and other partners who play a vital role in delivering nutrition services and shaping policies. ECNA provides targeted training, resources, and technical support to these stakeholders, enabling them to implement more effective nutrition interventions and coordinate efforts across sectors. By enhancing their capacity, stakeholders can better manage programs, advocate for necessary policy changes, and ensure that nutrition initiatives are aligned with community needs and national goals. This strengthened capacity also fosters leadership in nutrition governance, improving the overall efficiency and impact of efforts to combat malnutrition at both local and national levels.
                                    </p>
                                </div>
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl " />
                            </div>
                            <div className="md:px-20 sm:px-10 px-5 flex gap-10 flex-col-reverse md:flex-row">
                                <Image src={image} alt="image" height={300} className="w-full md:w-[50%] rounded-3xl " />
                                <div className="md:w-[50%] flex flex-col gap-6">
                                    <h1 className="text-center text-4xl font-semibold">Multi-sectoral nutrition coordination and governance capacity strengthened at national and regional level</h1>
                                    <p className="text-xl">
                                        Multi-sectoral nutrition coordination and governance capacity strengthened at national and regional level,&quot; aims to enhance the capacity of national and regional institutions to coordinate and govern nutrition-related activities across various sectors. This involves building stronger governance frameworks that facilitate collaboration between different governmental and non-governmental organizations, ensuring that policies, programs, and resources related to nutrition are well-aligned and effectively managed. By improving coordination and governance at these higher levels, the program seeks to ensure that nutrition interventions are consistently implemented, scaled up, and monitored across regions, leading to more comprehensive and long-term improvements in the nation&apos;s nutritional status. This subgroup also emphasizes the importance of accountability, data-driven decision-making, and inclusive policy-making to achieve sustainable nutrition outcomes.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </section>
                </main>
            </main>
        </Layout>
    );
}
