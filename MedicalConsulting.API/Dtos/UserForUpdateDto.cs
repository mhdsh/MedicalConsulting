namespace MedicalConsulting.API.Dtos
{
    public class UserForUpdateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
        public string MedicalHistory { get; set; }
    }
}