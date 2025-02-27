USE [WEBautomationCS]
GO

/****** Object:  Table [dbo].[chromeuser]    Script Date: 28.03.2017 10:56:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[chromeuser](
	[id_chromeuser] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [int] NULL,
	[ip] [varchar](15) NULL,
	[host] [varchar](100) NULL,
	[page] [varchar](100) NULL,
	[version] [varchar](100) NULL,
	[datetime] [datetime] NULL,
 CONSTRAINT [PK_chromeuser] PRIMARY KEY CLUSTERED 
(
	[id_chromeuser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/*
SELECT [chromeuser].[ip]
	,[chromeuser].[host]
	,[user].[name]
	,[user].[lastname]
	,[chromeuser].[page]
	,[chromeuser].[version]
	,[chromeuser].[datetime]
FROM [WEBautomationCS].[dbo].[chromeuser]
LEFT OUTER JOIN [user] ON [chromeuser].[id_user] = [user].[id_user]
*/

