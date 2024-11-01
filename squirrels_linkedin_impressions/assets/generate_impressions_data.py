from datetime import date, timedelta
import pandas as pd
import random

num_users = 500_000
num_impressions = 10_000_000
num_posts = 1_000

company_names = 10*["Quantum Dynamics","Horizon Technologies","BlueWave Innovations","Apex Solutions","Stellar Industries","CloudGate Systems","Elevate Software","Nexus Enterprises","Synergy Networks","SolarFlare Energy","Peak Performance","FusionTech","Velocity Ventures","AlphaOmega Corp","Zenon Labs","Radiant Global","Echo Enterprises","Infinite Loop","Prism Technologies","NovaTech Industries","Vector Dynamics","SkyTech Innovations","Phoenix Solutions","PrimeTime Industries","NextGen Systems","Insight Analytics","Frontier Robotics","OmniCore Solutions","HorizonX Ventures","SilverLine Tech","TerraNova Systems","Vanguard Enterprises","Pulsar Technologies","Neptune Solutions","Summit Industries","Pulse Networks","Ionex Corp","SolarVista Energy","Stratosphere Solutions","Equinox Labs","TechRise Solutions","InnovateHub","Zenith Enterprises","BlueOrbit Tech","Ironclad Solutions","SparkTech Labs","Apexion Industries","SolarTech Systems","CrystalWave Solutions","Luminary Labs","Orbit Enterprises","HelixCore Solutions","CrescentTech","Infinium Systems","Catalyst Networks","Polaris Innovations","IonTech Systems","Hyperion Global","Ascend Solutions","EchoTech Ventures","Radiance Robotics","Vertex Innovations","FusionCore Systems","PrimePath Solutions","Thunderbolt Tech","Clearstream Systems","Insight Edge","Odyssey Technologies","Pulsar Enterprises","ApexPoint Solutions","EverGreen Tech","BlueMoon Innovations","Elevation Systems","AstroDynamics","PeakEdge Solutions","QuantumFlux Labs","Innovision Systems","Solstice Enterprises","Cloudscape Solutions","TerraCore Technologies","CyberLink Innovations","StarWave Industries","Orbitron Systems","StrideTech Solutions","NextEra Innovations","Synergia Systems","NovaEdge Solutions","SolarSync Technologies","Vectorial Systems","EchoWave Enterprises","TrueNorth Solutions","Skyward Innovations","PrismWave Systems","ThunderCore Solutions","BlueSky Tech","Vertex Labs","LuminaTech","IronWave Systems","TerraEdge Solutions","SilverStream Innovations"]
num_companies = len(company_names)

zero_fill_num = 6

# Function to generate company data
def generate_company_data():
    company_size_options = ["10,000+ employees", "5001-10,000 employees", "1001-5000 employees", "501-1000 employees", "201-500 employees", "51-200 employees"]
    company_data = {
        "company_id": [f"C{str(i).zfill(zero_fill_num)}" for i in range(1, num_companies+1)],
        "company_name": company_names,
        "num_employees": [random.choice(company_size_options) for _ in range(num_companies)]
    }
    return pd.DataFrame(company_data)

# Function to generate user data
def generate_user_data():

    def randomize_distribution(keys):
        get_count = lambda: random.randint(11, 20)
        return [key for key in keys for _ in range(get_count())]

    first_names = ["John", "Jane", "Alex", "Emily", "Chris", "Pat", "Taylor", "Jordan", "Morgan", "Casey"]
    last_names = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"]
    job_titles = randomize_distribution(["Software Engineer", "Data Scientist", "Product Manager", "Designer", "Sales Manager", "HR Specialist"])
    city_names = randomize_distribution(["New York", "San Francisco", "Chicago", "Los Angeles", "Austin", "Seattle", "Toronto", "Vancouver"])
    industries = randomize_distribution(["Technology", "Finance", "Healthcare", "Retail", "Manufacturing", "Education"])

    user_data = {
        "user_id": [f"U{str(i).zfill(zero_fill_num)}" for i in range(1, num_users+1)],
        "full_name": [f"{random.choice(first_names)} {random.choice(last_names)}" for _ in range(num_users)],
        "company_id": [f"C{str(random.randint(1, num_companies)).zfill(zero_fill_num)}" for _ in range(num_users)],
        "job_title": [random.choice(job_titles) for _ in range(num_users)],
        "city": [random.choice(city_names) for _ in range(num_users)],
        "industry": [random.choice(industries) for _ in range(num_users)]
    }
    return pd.DataFrame(user_data)

def generate_impressions_data(start_date: date, end_date: date):
    days_between = (end_date - start_date).days
    impressions_data = {
        "post_id": [f"P{str(random.randint(1, num_posts)).zfill(4)}" for _ in range(num_impressions)],
        "date": [start_date + timedelta(days=random.randint(0, days_between)) for _ in range(num_impressions)],
        "user_id": [f"U{str(random.randint(1, num_users)).zfill(zero_fill_num)}" for _ in range(num_impressions)],
    }
    return pd.DataFrame(impressions_data).sort_values(["post_id", "date"])

# Generate datasets
company_df = generate_company_data()
company_df.to_csv("companies.csv", index=False)

user_df = generate_user_data()
user_df.to_csv("users.csv", index=False)

impressions_df = generate_impressions_data(date(2024,9,30), date(2024,10,28))
impressions_df.to_csv("impressions.csv", index=False)
