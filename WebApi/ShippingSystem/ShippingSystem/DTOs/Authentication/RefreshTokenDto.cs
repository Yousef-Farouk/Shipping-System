using System.ComponentModel.DataAnnotations;

namespace ShippingSystem.DTOs.Authentication
{
    public class RefreshTokenDto
    {
        [Required]
        public string accessToken { get; set; }

        [Required]
        public string refreshToken { get; set; }
    }
}
