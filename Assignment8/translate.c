/* 

<< Description >>
Write a program that translates the input from iso8859-7 characters (English and Greek characters) to iso8859-1 characters (English characters). The program will work as a Unix shell filter, that is, it will 
accept input from standard input and output to standard output and possibly to standard error. In particular, your program will read text characters from the standard input (which we assume is text written in 
iso8859-7 Greek characters), write the same text, translated based on the following rules, to the standard output, and write possible error and warning messages in the standard error.

<< Author >>
Name: Raphael
Surname: Papadakis

*/

#include <stdio.h>
#include <stdlib.h>

#define S 256
#define C 4

/* Function my print in order top print one character */
void myprint(int c, char iso[S][C]) 
{
	int i = 0;

	while (iso[c][i] != '\0')
	{
		/* I print only one character */
		putchar(iso[c][i]);
		i++;
	}
}

int main()
{
	/* Enum */
	enum myEnumName 
	{
		State_all,
		State_m,
		State_M,
		State_n,
		State_N
	};

	/* counter */
	unsigned int i, i1, i2; 
	/* 256 theseis tou iso */
	char iso[S][C]; 
	enum myEnumName j = State_all;

	/* I insert \0 */
	for(i1 = 0; i1 < S; i1++) 
	{
		for(i2 = 0; i2 < C; i2++)
		{
			iso[i1][i2] = '\0';
		}
	}

	/* I insert the english letters and \n */
	for(i1 = 0; i1 < 128; i1++) 
	{
		iso[i1][0] = i1;
	}

/* DECIMEL */
	iso[193][0] = 65;	/* A*/
	iso[194][0] = 86;	/* V*/
	iso[195][0] = 71;	/* G*/
	iso[196][0] = 68;	/* D*/
	iso[197][0] = 69;	/* E*/
	iso[198][0] = 90;	/* Z*/
	iso[199][0] = 72;	/* H*/
	iso[200][0] = 56;	/* 8*/
	iso[201][0] = 73;	/* I*/
	iso[202][0] = 75; 	/* K*/
	iso[203][0] = 76; 	/* L*/
	iso[204][0] = 77; 	/* M*/
	iso[205][0] = 78; 	/* N*/
	iso[206][0] = 75; 	/* KS*/
	iso[206][1] = 83;
	iso[207][0] = 79; 	/* O*/
	iso[208][0] = 80; 	/* P*/
	iso[209][0] = 82; 	/* R*/
	iso[211][0] = 83; 	/* S*/
	iso[212][0] = 84; 	/* T*/
	iso[213][0] = 89; 	/* Y*/
	iso[214][0] = 70; 	/* F*/
	iso[215][0] = 88; 	/* X*/
	iso[216][0] = 80; 	/* PS*/
	iso[216][1] = 83;
	iso[217][0] = 87;	 /* W*/

/* CHARACTERS */
	iso[225][0] = 'a';	 /* a*/
	iso[226][0] = 'v';   /* v*/
	iso[227][0] = 'g';	 /* g*/
	iso[228][0] = 'd';	 /* d*/
	iso[229][0] = 'e';	 /* e*/
	iso[230][0] = 'z'; 	 /* z*/
	iso[231][0] = 'h';	 /* h*/
	iso[232][0] = '8';	 /* 8*/
	iso[233][0] = 'i';	 /* i*/
	iso[234][0] = 'k';	 /* k*/
	iso[235][0] = 'l';	 /* l*/
	iso[236][0] = 'm';	 /* m*/
	iso[237][0] = 'n';	 /* n*/
	iso[238][0] = 'k';	 /* ks*/
	iso[238][1] = 's';
	iso[239][0] = 'o';	 /* o*/
	iso[240][0] = 'p';	 /* p*/
	iso[241][0] = 'r';	 /* r*/
	iso[242][0] = 's';	 /* s*/
	iso[243][0] = 's';	 /* s*/
	iso[244][0] = 't';	 /* t*/
	iso[245][0] = 'y';	 /* y*/
	iso[246][0] = 'f';	 /* f*/
	iso[247][0] = 'x';	 /* x*/
	iso[248][0] = 'p';	 /* ps*/
	iso[248][1] = 's';
	iso[249][0] = 'w';	 /* w*/

	iso[182][0] = '\'';
	iso[182][1] = 'A';

	iso[184][0] = '\'';
	iso[184][1] = 'E';

	iso[185][0] = '\'';
	iso[185][1] = 'H';

	iso[186][0] = '\'';
	iso[186][1] = 'I';

	iso[188][0] = '\'';
	iso[188][1] = 'O';

	iso[191][0] = '\'';
	iso[191][1] = 'W';

	iso[190][0] = '\'';
	iso[190][1] = 'Y';

	iso[220][0] = 'a';
	iso[220][1] = '\'';

	iso[221][0] = 'e';
	iso[221][1] = '\'';

	iso[222][0] = 'h';
	iso[222][1] = '\'';

	iso[223][0] = 'i';
	iso[223][1] = '\'';

	iso[252][0] = 'o';
	iso[252][1] = '\'';

	iso[254][0] = 'w';
	iso[254][1] = '\'';

	iso[253][0] = 'y';
	iso[253][1] = '\'';

	iso[218][0] = 'I';
	iso[218][1] = '\"'; 	/* I"*/
	iso[219][0] = 'Y';
	iso[219][1] = '\"';		/* Y"*/

	iso[250][0] = 'i';
	iso[250][1] = '\"';

	iso[251][0] = 'y';
	iso[251][1] = '\"';

	iso[192][0] = 'i';
	iso[192][1] = '\'';
	iso[192][2] = '"';

	iso[224][0] = 'y';
	iso[224][1] = '\'';
	iso[224][2] = '"';

	while ((i = getchar()) != EOF)
	{
		switch(j)
		{
			case State_all:
				if(i == 204) /* M*/
				{
					j = State_M;
				}
				else if (i == 236) /* m*/
				{
					j = State_m;
				}
				else if (i == 205) /* N*/
				{
					j = State_N;
				}
				else if (i == 237) /* n*/
				{
					j = State_n;
				}
				else
				{
					myprint(i, iso);
				}
			break;

			case State_m:
				if(i == 236)
				{
					putchar('m');
				}
				else if(i == 240 || i == 208)
				{
					putchar('b');
					j = State_all;
				}
				else if(i == 237)
				{
					j = State_n;
					putchar('m');
				}
				else if(i == 204)
				{
					j = State_M;
					putchar('m');
				}
				else if(i == 205)
				{
					j = State_N;
					putchar('m');
				}
				else
				{
					putchar('m');
					myprint(i, iso);
					j = State_all;
				}
			break;

			case State_M:
				if(i == 204)
				{
					putchar('M');
				}
				else if (i == 240 || i == 208)
				{
					putchar('B');
					j = State_all;
				}
				else if(i == 236)
				{
					j = State_m;
					putchar('M');
				}
				else if(i == 237)
				{
					j = State_n;
					putchar('M');
				}
				else if(i == 205)
				{
					j = State_N;
					putchar('M');
				}
				else
				{
					putchar('M');
					myprint(i, iso);
					j = State_all;
				}
			break;

			case State_n:
				if(i == 237)
				{
					putchar('n');
				}
				else if(i == 212 || i == 244)
				{
					putchar('d');
					j = State_all;
				}
				else if(i == 236)
				{
					j = State_m;
					putchar('n');
				}
				else if(i == 204)
				{
					j = State_M;
					putchar('n');
				}
				else if(i == 205)
				{
					j = State_N;
					putchar('n');
				}
				else
				{
					putchar('n');
					myprint(i, iso);
					j = State_all;
				}
			break;

			case State_N:
				if(i == 205)
				{
					putchar('N');
				}
				else if(i == 212 || i == 244)
				{
					putchar('D');
					j = State_all;
				}
				else if(i == 236)
				{
					j = State_m;
					putchar('N');
				}
				else if(i == 204)
				{
					j = State_M;
					putchar('N');
				}
				else if(i == 237)
				{
					j = State_n;
					putchar('N');
				}
				else
				{
					putchar('N');
					myprint(i, iso);
					j = State_all;
				}
			break;
		}
	}

	return EXIT_SUCCESS;
}
