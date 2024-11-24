import missionIcon from '../../public/icon/mission.png'
import visionIcon from '../../public/icon/vision.png'
import valuesIcon from '../../public/icon/value.png'
import Image from 'next/image'
export default function MissionVisionValues() {
    return (
        <section className="bg-[#F9F9F9] min-h-[100vh] flex flex-col md:flex-row gap-8 items-center justify-center py-10 px-4 md:px-0">
            {/* Mission Card */}
            <div className="relative w-full md:w-[400px] h-[400px] md:p-6 bg-white rounded-lg shadow-md text-center p-5">
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[50px] border-t-[#FF4719] border-r-[50px] border-r-transparent md:border-t-[100px] md:border-r-[100px]"></div>
                <div className="relative z-10">
                    <div className="flex justify-center mb-2">
                       <Image src={missionIcon} alt="mission" width={50} height={50} />
                    </div>
                    <h1 className="text-[#293745] font-bold text-3xl text-center">Goal</h1>
                    <p className="text-[#555555] mt-2 text-base text-justify">
                        To improve the nutritional status of women, children, and adolescent girls by promoting appropriate nutritional behaviors, increasing demand for and quality of nutrition services, and enhancing coordination among nutrition stakeholders across sectors.
                    </p>
                </div>
            </div>
            
            {/* Vision Card */}
            <div className="relative w-full md:w-[400px] h-[400px] p-6 bg-white rounded-lg shadow-md text-center">
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[50px] border-t-[#293745] border-r-[50px] border-r-transparent md:border-t-[100px] md:border-r-[100px]"></div>
                <div className="relative z-10">
                    <div className="flex justify-center mb-2">
                        <Image src={visionIcon} alt="vision" width={50} height={50} />
                    </div>
                    <h1 className="text-[#293745] font-bold text-3xl text-center">Objectives</h1>
                    <div className="text-[#555555] mt-2 text-base text-justify">
                        <p className="mb-2">Promoting appropriate nutritional behaviors: Encouraging communities to adopt healthy dietary practices.</p>
                        <p className="mb-2">Increasing demand for nutrition services: Motivating individuals to utilize available nutrition-related services.</p>
                        <p className="mb-2">Improving the quality of nutrition services: Elevating the standard of nutrition services at the community level.</p>
                    </div>
                </div>
            </div>
            
            {/* Values Card */}
            <div className="relative w-full md:w-[400px] h-[400px] p-6 bg-white rounded-lg shadow-md">
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[50px] border-t-[#D03000] border-r-[50px] border-r-transparent md:border-t-[100px] md:border-r-[100px]"></div>
                <div className="relative z-10">
                    <div className="flex justify-center mb-2">
                        <Image src={valuesIcon} alt="values" width={50} height={50} />
                    </div>
                    <h1 className="text-[#293745] font-bold text-3xl text-center">Intermidate Result Areas</h1>
                    <div className="text-left mt-2">
                        <p className="text-[#555555] text-base">
                            <span className="font-bold">IR1:</span>
                            <span className="ml-2">Improved Nutrition Practices and Demand for Services through Behavior Change Communication (BCC), Community Engagement, Nutrition Education</span>
                        </p>
                        <p className="text-[#555555] mt-2 text-base">
                            <span className="font-bold">IR2:</span>
                            <span className="ml-2">Improved Quality of Nutrition Services, through Capacity Building, Service Integration, Quality Assurance</span>
                        </p>
                        <p className="text-[#555555] mt-2 text-base">
                            <span className="font-bold">IR3:</span>
                            <span className="ml-2">Improved Coordination among Nutrition Stakeholders, through Stakeholder Collaboration, Policy Advocacy and Resource Mobilization</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}