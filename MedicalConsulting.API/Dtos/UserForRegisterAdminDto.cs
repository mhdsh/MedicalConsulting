using System.ComponentModel.DataAnnotations;

namespace MedicalConsulting.API.Dtos
{
    public class UserForRegisterAdminDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 3, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }

        public bool IsAdmin { get; set; }
    }
}