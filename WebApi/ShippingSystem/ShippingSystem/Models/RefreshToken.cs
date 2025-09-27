namespace ShippingSystem.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public bool IsActive => DateTime.UtcNow <= Expires;
        public string UserId { get; set; } 
        public virtual ApplicationUser User { get; set; } 
    }
}
