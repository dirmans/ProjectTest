using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTest.DTOs
{
    public class PayloadDto
    {
        public string PromoId { get; set; }
        public List<FileStore> FileStore { get; set; }
    }

    public class FileStore
    {
        public string FilePath { get; set; }
        public string FileName { get; set; }
    }
}
