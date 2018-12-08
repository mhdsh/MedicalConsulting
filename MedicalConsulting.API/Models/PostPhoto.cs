namespace MedicalConsulting.API.Models
{
    public class PostPhoto
    {
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
    }
}