using System;
using System.Collections.Generic;

namespace MedicalConsulting.API.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Excerpt { get; set; }
        public DateTime Created { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicIdPhoto { get; set; }
        public IList<PostPhoto> PostPhotos { get; set; }
    }
}