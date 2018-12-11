using System;

namespace MedicalConsulting.API.Dtos
{
    public class PostForAddDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Excerpt { get; set; }
        public DateTime Created { get; set; }
        public string Url { get; set; }
        public string PublicIdPhoto { get; set; }
        public int UserId { get; set; }

        public PostForAddDto()
        {
            this.Created = DateTime.Now;
        }
    }
}