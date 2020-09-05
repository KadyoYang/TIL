



 /*
class Base {
private: int m_pri;
protected: int m_pro;
public: int m_pub;
};

class Derived : public Base {
public :
	Derived(int m_pri = 1, int m_pro = 2, int m_pub = 3);
	void func();
};

Derived::Derived(int m_pri, int m_pro, int m_pub)
{
	//this->m_pri = m_pri;
	this->m_pro = m_pro;
	this->m_pub = m_pub;
}
void Derived::func()
{
	//cout << m_pri << endl;
	cout << m_pro << endl;
	cout << m_pub << endl;
}


void main()
{
	Derived Obj;
	Obj.func();

	//cout << Obj.m_pri << endl;
	//cout << Obj.m_pro << endl;
	cout << Obj.m_pub << endl;
}

*/